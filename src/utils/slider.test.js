import { getNextIndex, getPrevIndex } from './slider';

//Next
test('getNextIndex debe avanzar al siguiente indice', () => {
  const indexActual = 1;
  const total = 10;
  const nuevoIndex = getNextIndex(indexActual, total);
  expect(nuevoIndex).toBe(2);
});

test('getNextIndex debe volver al inicio que es 0 si esta en el ultimo', () => {
  const indexActual = 9; 
  const total = 10;
  const nuevoIndex = getNextIndex(indexActual, total);
  expect(nuevoIndex).toBe(0);
});


//Prev
test('getPrevIndex debe retroceder al indice anterior', () => {
  const indexActual = 5;
  const total = 10;
  const nuevoIndex = getPrevIndex(indexActual, total);
  expect(nuevoIndex).toBe(4);
});

test('getPrevIndex debe ir al ultimo si esta en el p0', () => {
  const indexActual = 0; 
  const total = 10;
  const nuevoIndex = getPrevIndex(indexActual, total);
  expect(nuevoIndex).toBe(9);
});