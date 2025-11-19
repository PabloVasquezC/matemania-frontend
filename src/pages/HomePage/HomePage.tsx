import { Link } from "react-router-dom";
import logo from "@assets/logo.png";
import "./home-page.css";

import { useUserStore } from "store/useUserStore";
import type { IUserState } from "../../types/IUserState";
import playClickSound from "@utils/sounds/play_sound";
import { useEffect } from 'react';
// ⭐️ IMPORTACIÓN DE SHEPHERD: Solo de tipos y la clase principal
import Shepherd, { type Tour, type PopperPlacement, type StepOptions } from 'shepherd.js';
// Usamos el CSS personalizado que importa el CSS base de Shepherd
import './shepherd-custom.css'; 

// ⭐️ DEFINICIÓN DE LOS PASOS DEL TOUR
const tourSteps: StepOptions[] = [
    {
      id: 'welcome',
      text: '¡Bienvenido a Matemanía! Empecemos un tour rápido. Haz clic en Siguiente.',
      // Apuntando al h1 del header, que siempre existe
      attachTo: { element: '#app-title', on: 'bottom' as PopperPlacement }, 
      // ⚠️ Simplificado a solo la clase personalizada
      classes: 'shepherd-theme-custom', 
      buttons: [
        // Uso de 'function(this: Tour)' para evitar errores de tipado
        { text: 'Omitir', action: function(this: Tour) { this.complete(); } }, 
        { text: 'Siguiente', action: function(this: Tour) { this.next(); } }     
      ]
    },
    {
      id: 'game-explanation',
      text: 'Aquí explicamos la mecánica única del juego: crear ecuaciones en lugar de palabras.',
      // Apuntando al ID que aplicamos en el JSX
      attachTo: { element: '#game-explanation-text', on: 'top' as PopperPlacement }, 
      classes: 'shepherd-theme-custom',
      buttons: [
        // Uso de 'function(this: Tour)'
        { text: 'Anterior', action: function(this: Tour) { this.back(); } },
        { text: 'Siguiente', action: function(this: Tour) { this.next(); } }
      ]
    },
    {
      id: 'start-button',
      text: 'Cuando estés listo, haz clic aquí para elegir el modo de juego y empezar el desafío.',
      // Apuntando al ID que aplicamos en el JSX
      attachTo: { element: '#start-game-button', on: 'top' as PopperPlacement }, 
      classes: 'shepherd-theme-custom',
      buttons: [
        // Uso de 'function(this: Tour)'
        { text: 'Anterior', action: function(this: Tour) { this.back(); } },
        { text: 'Finalizar', action: function(this: Tour) { this.complete(); } }
      ]
    }
  ];


export default function HomePage() {
    const user = useUserStore((state: IUserState) => state.user);

    // ⭐️ LÓGICA DEL TOUR EN EFFECT
    useEffect(() => {
        // --- LOG 1: Comprobación inicial de bloqueo ---
        const hasSeenTour = localStorage.getItem('matemania_tour_seen');
        if (hasSeenTour) {
            console.log("Shepherd Tour: Bloqueado. Clave 'matemania_tour_seen' encontrada.");
            return; 
        }
        
        // --- LOG 2: Comprobación de existencia del primer elemento ---
        const firstElement = document.querySelector(tourSteps[0].attachTo?.element as string);
        if (!firstElement) {
            console.error(`Shepherd Tour: ERROR CRÍTICO. El primer elemento de anclaje (${tourSteps[0].attachTo?.element}) NO existe en el DOM cuando se intenta iniciar.`);
            return;
        }
        console.log(`Shepherd Tour: El primer elemento de anclaje (${tourSteps[0].attachTo?.element}) ha sido encontrado.`);


        // Inicialización del Tour
        const tour = new Shepherd.Tour({
            defaultStepOptions: {
                cancelIcon: { enabled: true },
                // Clase aplicada para el tema personalizado
                classes: 'shepherd-theme-custom', 
                scrollTo: { behavior: 'smooth', block: 'center' },
            },
            // Usar overlay para focalizar el elemento
            useModalOverlay: true
        });

        // Añadir pasos
        tour.addSteps(tourSteps);
        
        // Marcar como visto al finalizar o cancelar (Esto se hace SOLO con interacción del usuario)
        const setTourSeen = () => localStorage.setItem('matemania_tour_seen', 'true');
        tour.on('complete', setTourSeen);
        tour.on('cancel', setTourSeen);

        // Lanzar
        console.log("Shepherd Tour: Iniciando...");
        try {
            tour.start();
            // --- LOG 3: Resultado de inicio ---
            console.log("Shepherd Tour: Iniciado correctamente. Debería ser visible.");
        } catch (error) {
            console.error("Shepherd Tour: Falló al llamar a tour.start()", error);
        }
        

        // 🛑 CAMBIO CRÍTICO: Limpieza sin marcar como 'visto'
        return () => {
          if (tour.isActive()) { 
            // Solo ocultar/limpiar, NO llamar a .complete() para evitar guardar el localStorage
            tour.hide(); 
          }
        };
    }, []);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
            <img src={logo} alt="Logo" className="w-100 h-100 mb-4 animate-fadeIn" />
            <header className="mb-10 text-center animate-fadeIn">
                <h1 
                    // ⭐️ ID aplicado al título para el primer paso
                    id="app-title"
                    className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse">
                    Matemanía
                </h1>
                {user ? (
                    <p className="text-lg md:text-xl text-gray-400">
                        <span className="font-bold text-teal-300">¡Hola {user.username}!</span> Bienvenido a Matemania,
                    </p>
                ) : (
                    <p className="text-lg md:text-xl text-gray-400">
                        Donde las letras se convierten en números y el ingenio matemático es tu mejor jugada.
                    </p>
                )}
            </header>

            <main 
                className="
                  w-full 
                  max-w-2xl 
                  bg-gray-800 
                  rounded-2xl 
                  shadow-2xl 
                  p-8 md:p-12 
                  text-center 
                  transform 
                  transition-all 
                  duration-500 
                  hover:scale-[1.01]
                "
            >
                <section className="mb-6">
                    <h2 className="
                        text-3xl 
                        md:text-4xl 
                        font-bold 
                        text-teal-400 
                        mb-4 
                        animate-slideIn">
                        Pon a prueba tu mente
                    </h2>
                    {/* ⭐️ ID necesario para el tour (Segundo paso) */}
                    <p 
                      className="text-base md:text-lg text-gray-300 leading-relaxed animate-slideIn"
                      id="game-explanation-text"
                    >
                        Bienvenido a una nueva dimensión de Scrabble. En lugar de formar palabras, crearás ecuaciones. 
                        Utiliza las fichas numéricas y operadores (+, -, *, /) para construir expresiones matemáticas válidas 
                        y obtener la puntuación más alta. Piensa estratégicamente, bloquea a tu oponente y 
                        demuestra que eres el maestro de los números.
                    </p>
                </section>

                <Link 
                  onClick={playClickSound} 
                  to="/game" 
                  // ⭐️ ID necesario para el tour (Tercer paso)
                  id="start-game-button"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                    ¡Jugar ahora!
                </Link>
            </main>
        </div>
    );
}