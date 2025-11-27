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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8 font-sans">
            <img 
                src={logo} 
                alt="Logo" 
                className="
                    w-24 h-24
                    sm:w-32 sm:h-32
                    md:w-40 md:h-40
                    mb-6 md:mb-8
                    animate-fadeIn
                    animate-float
                    drop-shadow-2xl
                " 
            />
            <header className="mb-8 md:mb-12 text-center animate-fadeIn stagger-delay-1">
                <h1 
                    id="app-title"
                    className="
                        text-4xl
                        sm:text-5xl
                        md:text-6xl
                        lg:text-7xl
                        font-extrabold 
                        mb-3 md:mb-4
                        text-transparent 
                        bg-clip-text 
                        bg-gradient-to-r 
                        from-teal-400 
                        via-blue-500
                        to-indigo-500
                        gradient-animate
                        drop-shadow-lg
                    ">
                    Matemanía
                </h1>
                {user ? (
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
                        <span className="font-bold text-teal-300 animate-shimmer">¡Hola {user.username}!</span> Bienvenido a Matemania
                    </p>
                ) : (
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                        Donde las letras se convierten en números y el ingenio matemático es tu mejor jugada.
                    </p>
                )}
            </header>

            <main 
                className="
                  w-full 
                  max-w-3xl
                  glass-effect
                  rounded-3xl 
                  shadow-2xl 
                  p-6
                  sm:p-8
                  md:p-12
                  lg:p-16
                  text-center 
                  transform 
                  transition-all 
                  duration-500 
                  hover:scale-[1.02]
                  hover:shadow-teal-500/20
                  animate-fadeIn
                  stagger-delay-2
                  border
                  border-gray-700/50
                "
            >
                <section className="mb-8 md:mb-10">
                    <h2 className="
                        text-2xl
                        sm:text-3xl
                        md:text-4xl
                        lg:text-5xl
                        font-bold 
                        gradient-text
                        mb-4 md:mb-6
                        animate-slideIn
                        stagger-delay-3
                    ">
                        Pon a prueba tu mente
                    </h2>
                    <p 
                      className="
                        text-sm
                        sm:text-base
                        md:text-lg
                        text-gray-300 
                        leading-relaxed 
                        md:leading-loose
                        animate-slideIn
                        stagger-delay-3
                        max-w-2xl
                        mx-auto
                      "
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
                  to="/gamemenu" 
                  id="start-game-button"
                  className="
                    inline-block
                    bg-gradient-to-r 
                    from-teal-500 
                    via-blue-500
                    to-indigo-600 
                    hover:from-teal-600 
                    hover:via-blue-600
                    hover:to-indigo-700 
                    text-white 
                    font-bold 
                    text-base
                    sm:text-lg
                    md:text-xl
                    py-3 
                    px-8
                    md:py-4
                    md:px-12
                    rounded-xl
                    transition-all
                    duration-300 
                    ease-out
                    transform 
                    hover:scale-110
                    hover:shadow-2xl
                    hover:shadow-teal-500/50
                    active:scale-95
                    shadow-lg
                    animate-scale-in
                    stagger-delay-3
                    hover:-translate-y-1
                    border-2
                    border-teal-400/20
                    hover:border-teal-400/60
                  ">
                    ¡Jugar ahora!
                </Link>
            </main>
        </div>
    );
}