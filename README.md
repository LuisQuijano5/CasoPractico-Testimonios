# Carrusel de Testimonios Dinámico

**Elaboró:** Luis Angel Quijano Guerrero
**Materia:** Ingenieria de Software
**Fecha:** 6/11


---

Este proyecto implementa un componente interactivo de carrusel de testimonios desarrollado con React. Está diseñado para ser robusto, accesible y consumir datos en tiempo real, utilizando una base de datos NoSQL de Firebase.

---

## Características Principales

* **Datos en Tiempo Real:** Los testimonios se cargan dinámicamente desde **Firebase Realtime Database**.
* **Controles Accesibles:** Permite navegar con botones en pantalla (Siguiente, Anterior, Aleatorio).
* **Navegación por Teclado:** Soporte para las teclas **← Flecha Izquierda** y **→ Flecha Derecha** para cambiar testimonios. Al usar las flechas, se simula el efecto de "clic" visual en el botón correspondiente.
* **Autoplay:** Los testimonios rotan automáticamente cada 5 segundos. La rotación se pausa con cualquier interacción del usuario (clic o tecla).
* **Transiciones CSS:** Efectos visuales suaves de *fade-in* en las imágenes al cambiar el testimonio.

---

## Tecnologías Utilizadas

* **Frontend:** React (usando `useState`, `useEffect`, `useCallback`, `useRef`).
* **Compilador:** Vite.js
* **Estilos:** CSS3.
* **Base de Datos:** Firebase Realtime Database.
