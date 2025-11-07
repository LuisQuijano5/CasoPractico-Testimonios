export default function Controls({ onPrev, onNext, onRandom, prevRef, nextRef }) {
  return (
    <div className="controls">
      <button onClick={onPrev} aria-label="Testimonio Anterior" ref={prevRef}>◀</button>
      <button onClick={onRandom} aria-label="Testimonio Aleatorio">🎲</button>
      <button onClick={onNext} aria-label="Testimonio Siguiente" ref={nextRef}>▶</button> {/* Cambiar  */}
    </div>
  );
}