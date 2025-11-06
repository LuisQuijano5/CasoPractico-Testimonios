
import React, { useState, useEffect, useRef } from 'react';
import testimonios from './data';
import Testimonial from './components/Testimonial';
import Controls from './components/Controls';
import './styles.css';

export default function App() {
  const [index, setIndex] = useState(0);
  const length = testimonios.length;
  
  const autoplayRef = useRef(null);

  const next = () => {
    setIndex(prev => (prev + 1) % length);
  };

  const prev = () => {
    setIndex(prev => (prev - 1 + length) % length);
  };

  const random = () => {
    let r = Math.floor(Math.random() * length);
    if (r === index) {
      r = (r + 1) % length;
    }
    setIndex(r);
  };

  const handleUserAction = (actionFn) => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    actionFn();
    autoplayRef.current = setInterval(() => {
      next();
    }, 5000);
  };

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      next();
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [length]);



  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handleUserAction(prev);
      } else if (event.key === 'ArrowRight') {
        handleUserAction(next);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUserAction, prev, next]);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      next();
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [next]);

  const currentTestimonial = testimonios[index];

  return (
    <main className="app">
      <h1>Testimonios</h1>
      <div className="card-wrapper">
        <Testimonial 
          key={currentTestimonial.id}
          item={testimonios[index]} 
        />
      </div>

      <Controls
        onPrev={() => handleUserAction(prev)}
        onNext={() => handleUserAction(next)}
        onRandom={() => handleUserAction(random)}
      />

      <p className="counter"> {index + 1} / {length} </p>
    </main>
  );
}
