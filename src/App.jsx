import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from './db';
import { ref, get } from 'firebase/database';
import Testimonial from './components/Testimonial';
import Controls from './components/Controls';
import { getNextIndex, getPrevIndex } from './utils/slider';
import './styles.css';

export default function App() {
  const [testimonios, setTestimonios] = useState([]); 
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  const length = testimonios.length; 
  const autoplayRef = useRef(null);

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        setLoading(true);
        const dbRef = ref(db, 'testimonios');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const testimoniosData = Object.keys(data)
            .map(key => ({
              id: key,
              ...data[key]
            }))
            .filter(item => item.id > 0); 

          setTestimonios(testimoniosData);
          setError(null);
        } else {
          setError("No se encontraron testimonios");
        }
      } catch (err) {
        console.error("Error al cargar testimonois: ", err); 
        setError("No se pudieron cargar los testimonios");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonios();
  }, []);


  // Ovbviamente no era necesario hacer esto, pero para poder implementar en algun lado las pruebas unitarias
  const next = useCallback(() => {
    setIndex(prev => getNextIndex(prev, length));
  }, [length]);

  const prev = useCallback(() => {
    setIndex(prev => getPrevIndex(prev, length));
  }, [length]);

  const random = useCallback(() => {
    if (length === 0) return;
    setIndex(prevIndex => {
      let r = Math.floor(Math.random() * length);
      if (r === prevIndex && length > 1) { 
        r = (r + 1) % length;
      }
      return r;
    });
  }, [length]);

  const handleUserAction = useCallback((actionFn) => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    actionFn();
    autoplayRef.current = setInterval(() => {
      next(); 
    }, 5000);
  }, [next]); 

  
  //Autoplay
  useEffect(() => {
    if (length > 0) {
      autoplayRef.current = setInterval(() => {
        next();
      }, 5000);

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }
  }, [length, next]); 

  useEffect(() => {
    const handleKeyDown = (event) => {
      
      const simulateClick = (buttonRef) => {
        if (!buttonRef.current) return;
        
        buttonRef.current.classList.add('active');

        setTimeout(() => {
          if (buttonRef.current) {
            buttonRef.current.classList.remove('active');
          }
        }, 150); 
      };

      if (event.key === 'ArrowLeft') {
        simulateClick(prevButtonRef); 
        handleUserAction(prev);
      } else if (event.key === 'ArrowRight') {
        simulateClick(nextButtonRef); 
        handleUserAction(next);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUserAction, prev, next]);


  
  if (loading) {
    return <main className="app"><h1>Cargando testimonios...</h1></main>;
  }

  if (error) {
    return <main className="app"><h1>{error}</h1></main>;
  }

  if (length === 0) {
    return <main className="app"><h1>No hay testimonios para mostrar.</h1></main>;
  }

  const currentTestimonial = testimonios[index];

  return (
    <main className="app">
      <h1>Testimonios</h1>
      <div className="card-wrapper">
        <Testimonial 
          key={currentTestimonial.id} 
          item={currentTestimonial} 
        />
      </div>

      <Controls
        onPrev={() => handleUserAction(prev)}
        onNext={() => handleUserAction(next)}
        onRandom={() => handleUserAction(random)}
        prevRef={prevButtonRef}
        nextRef={nextButtonRef}
      />

      <p className="counter"> {index + 1} / {length} </p>
    </main>
  );
}