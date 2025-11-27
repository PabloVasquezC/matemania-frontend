import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Rack from "../../components/Rack/Rack"; 
import Board from "../../components/Board/Board"; 
import PlayerRack from "../../components/PlayerRack/PlayerRack";
import generateRandomTiles from "../../utils/others/generate_random_tiles";
import createHandleDragEnd from "../../utils/drag&drop/handle_drag_end";

// ⚠️ COMENTADO: Ya no necesitamos escanear el tablero ni validar reglas
// import { getPlaySequences } from "../../utils/others/board_scanner"; 
// import playValidations from "../../utils/validations/play_validations"; 

import { useState, useEffect, useCallback } from "react"; 
import type { ITile } from "../../types/ITile";
import Shepherd, { type StepOptions } from 'shepherd.js';
import './shepherd-custom.css'; 
import { gamemusic } from "../../soundsManager";

//nothing to compare!?

// ⭐️ INTERFACE para el sistema de mensajes
interface MessageState {
    visible: boolean;
    text: string;
    type: 'success' | 'error' | 'info';
}

// ⭐️ COMPONENTE: Modal de Mensajes
const MessageBox = ({ message, onClose }: { message: MessageState, onClose: () => void }) => {
    if (!message.visible) return null;

    const baseClasses = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-6 md:p-8 rounded-2xl shadow-2xl transition-all duration-300 max-w-sm w-11/12 text-center font-bold text-white transform animate-scale-in backdrop-blur-md";
    let colorClasses = "";
    
    switch (message.type) {
        case 'success':
            colorClasses = "bg-gradient-to-br from-green-600/95 to-teal-600/95 border-4 border-green-400 shadow-green-500/50";
            break;
        case 'error': // Usamos rojo para el Game Over
            colorClasses = "bg-gradient-to-br from-red-600/95 to-rose-600/95 border-4 border-red-400 shadow-red-500/50";
            break;
        case 'info':
            colorClasses = "bg-gradient-to-br from-blue-600/95 to-indigo-600/95 border-4 border-blue-400 shadow-blue-500/50";
            break;
    }

    return (
        <>
            {/* Backdrop overlay */}
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
                onClick={onClose}
            />
            <div className={`${baseClasses} ${colorClasses}`}>
                <p className="text-lg md:text-xl mb-4 md:mb-6 leading-relaxed whitespace-pre-line">{message.text}</p>
                <button 
                    onClick={onClose}
                    className="
                        bg-white 
                        text-gray-800 
                        font-semibold 
                        py-2 
                        px-6
                        md:py-3
                        md:px-8
                        rounded-full 
                        hover:bg-gray-100
                        transition-all
                        duration-200
                        transform
                        hover:scale-110
                        active:scale-95
                        shadow-lg
                    "
                >
                    Aceptar
                </button>
            </div>
        </>
    );
}

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(minutes)}:${pad(remainingSeconds)}`;
}

function Gamepage() {
  const [currentPlayTiles, setCurrentPlayTiles] = useState<string[]>([]);
  const [player, setPlayer] = useState<{
    name: string;
    isActive: boolean;
    id: string;
    score: number;
  }>({ name: "Player 1", isActive: true, id: "player-1", score: 0 });
  
  const [tiles, setTiles] = useState<ITile[]>([]);
  const [tileLocations, setTileLocations] = useState<Record<string, string>>({});

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageState>({ visible: false, text: '', type: 'info' });

  const showMessage = useCallback((text: string, type: MessageState['type'] = 'info') => {
    setMessage({ visible: true, text, type });
  }, []);

  const hideMessage = useCallback(() => {
    setMessage(prev => ({ ...prev, visible: false }));
  }, []);

  const updateScore = (points: number) => {
      setPlayer((prev) => ({ ...prev, score: prev.score + points }));
  };

  // --- LÓGICA DEL TOUR (Sin cambios) ---
  useEffect(() => {
    if (localStorage.getItem('matemania_game_tour_seen')) {
        setIsTimerRunning(true); 
        return;
    }

    const tour = new Shepherd.Tour({
        defaultStepOptions: {
            cancelIcon: { enabled: true },
            classes: 'shepherd-theme-custom', 
            scrollTo: { behavior: 'smooth', block: 'center' },
        },
        useModalOverlay: true
    });

    const steps: StepOptions[] = [
        {
          id: 'rack-intro',
          text: '1. TUS FICHAS: Aquí comienza todo. Arrástralas al tablero.',
          attachTo: { element: '#player-rack-area', on: 'top' }, 
          buttons: [{ text: 'Omitir', action: tour.cancel }, { text: 'Siguiente', action: tour.next }]
        },
        {
          id: 'board-intro',
          text: '2. EL TABLERO: Suelta las fichas aquí. En este modo, TÚ decides si la ecuación es válida.',
          attachTo: { element: '#game-board-area', on: 'left' }, 
          buttons: [{ text: 'Anterior', action: tour.back }, { text: 'Siguiente', action: tour.next }]
        },
        {
          id: 'score-intro',
          text: '3. PUNTUACIÓN: Sumaremos los puntos de tus fichas automáticamente.',
          attachTo: { element: '#player-score', on: 'bottom' }, 
          buttons: [{ text: 'Anterior', action: tour.back }, { text: 'Siguiente', action: tour.next }]
        },
        {
          id: 'validate-btn',
          text: '4. VALIDAR: Pulsa aquí para sumar puntos y terminar tu turno.',
          attachTo: { element: '#end-turn-button', on: 'top' }, 
          buttons: [{ text: 'Anterior', action: tour.back }, { text: '¡A Jugar!', action: tour.complete }]
        }
    ];

    tour.addSteps(steps);

    const finishTour = () => {
        localStorage.setItem('matemania_game_tour_seen', 'true');
        setIsTimerRunning(true); 
    };

    tour.on('complete', finishTour);
    tour.on('cancel', finishTour); 

    const timer = setTimeout(() => {
        const rackElement = document.querySelector('#player-rack-area');
        if (rackElement) tour.start();
        else setIsTimerRunning(true);
    }, 1000);

    return () => {
        clearTimeout(timer);
        if (tour.isActive()) tour.cancel();
    };
  }, []);

  // 🎵 EFECTO DE MÚSICA DE FONDO 🎵
  useEffect(() => {
    // Solo reproducimos si el reloj está corriendo y el juego NO ha terminado
    if (isTimerRunning && !isGameOver) {
        // El id nos sirve para controlar esta instancia específica
        const soundId = gamemusic.play();
        gamemusic.fade(0, 0.5, 2000, soundId); // Efecto "Fade In" suave de 2 segundos
    } else {
        // Si el juego termina o se pausa el reloj, paramos la música
        gamemusic.stop();
    }

    // LIMPIEZA: Si el usuario sale de la página (desmonta el componente), cortar la música
    return () => {
        gamemusic.stop();
    };
  }, [isTimerRunning, isGameOver]); // Se ejecuta cuando cambia el estado del timer o game over

  // --- LÓGICA DE INICIO ---
  useEffect(() => {
    const gameMode = localStorage.getItem("mode") || "matematico"; 
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setPlayer((prev) => ({ ...prev, name: storedUsername }));

    const storedTimeLimit = localStorage.getItem("timeLimit");
    const initialTime = parseInt(storedTimeLimit || "180", 10); 
    setTimeLeft(initialTime); 

    const initialTiles = generateRandomTiles(30, gameMode); 
    setTiles(initialTiles);

    const initialLocations: Record<string, string> = {};
    initialTiles.forEach((tile) => initialLocations[tile.id] = "pool");
    setTileLocations(initialLocations);
  }, []);

  // --- LÓGICA DEL TEMPORIZADOR ---
  useEffect(() => {
    if (timeLeft === null || !isTimerRunning) return; 

    if (isGameOver || timeLeft <= 0) {
        if (timeLeft === 0 && !isGameOver) {
            setIsGameOver(true);
            // 🏆 AQUÍ SE MUESTRA EL PUNTAJE FINAL AUTOMÁTICAMENTE
            showMessage(`⏰ ¡Tiempo agotado! \n Tu puntuación final es: ${player.score}`, 'error');
        }
        return;
    }

    const intervalId = setInterval(() => {
        setTimeLeft(prevTime => (prevTime !== null ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, isGameOver, showMessage, player.score, isTimerRunning]); 


  // ⭐️⭐️⭐️ LÓGICA MODIFICADA: SIN VALIDACIÓN ⭐️⭐️⭐️
  const handleEndTurn = useCallback(() => {
    // 1. Si el juego terminó, no hacemos nada
    if (isGameOver) {
        showMessage("El juego ha terminado. ¡El tiempo se agotó!", 'info');
        return;
    }

    // 2. Verificación mínima (opcional): Que haya puesto al menos 1 ficha
    if (currentPlayTiles.length === 0) {
        showMessage("⚠️ Debes colocar fichas en el tablero primero.", 'info');
        return;
    }

    // ⚠️ LÓGICA ANTERIOR ELIMINADA/COMENTADA
    /*
    const firstPlayedTileId = currentPlayTiles[0];
    const scanLocation = tileLocations[firstPlayedTileId]; 
    const { horizontal, vertical } = getPlaySequences(tiles, tileLocations, scanLocation);
    ... validaciones complejas ...
    */

    // 3. NUEVA LÓGICA: "CRITERIO DEL USUARIO"
    // Buscamos los objetos (tiles) de las IDs que se jugaron en este turno
    const tilesPlayedObjects = tiles.filter(tile => currentPlayTiles.includes(tile.id));
    
    // Sumamos el valor numérico de cada ficha jugada
    // (Asumimos que 'value' es un número, si es undefined sumamos 0)
const turnPoints = tilesPlayedObjects.reduce((total, tile) => total + (Number(tile.value) || 0), 0);
    // 4. Aplicamos cambios (Siempre es "válido")
    updateScore(turnPoints);
    
    // Identificamos las fichas que salieron del 'pool' (rack) para reponerlas
    const tilesToReplaceFromRack = tiles.filter(tile => 
            currentPlayTiles.includes(tile.id) && tileLocations[tile.id] === 'pool'
    );

    // Generamos nuevas fichas
    const newRandomTiles = generateRandomTiles(tilesToReplaceFromRack.length);

    // Actualizamos estado de tiles
    setTiles(prevTiles => {
        const tilesToKeep = prevTiles.filter(tile => !tilesToReplaceFromRack.some(t => t.id === tile.id));
        return [...tilesToKeep, ...newRandomTiles]; 
    });

    // Ponemos las nuevas fichas en el 'pool'
    setTileLocations(prevLocations => {
        const newLocations = {...prevLocations};
        newRandomTiles.forEach(newTile => newLocations[newTile.id] = "pool");
        return newLocations;
    });
    
    setCurrentPlayTiles([]);
    
    // Mostramos mensaje de éxito
    showMessage(`✅ Turno finalizado. +${turnPoints} puntos.`, 'success');

  }, [currentPlayTiles, tileLocations, tiles, updateScore, showMessage, isGameOver]); 

  const handleDragEnd = createHandleDragEnd({
      tileLocations, setTiles, setTileLocations, tiles, updateScore, setCurrentPlayTiles 
  });
  
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const timerColor = timeLeft !== null && timeLeft <= 30 && timeLeft > 0 
    ? 'text-red-500 animate-pulse'
    : timeLeft !== null && timeLeft <= 60 
    ? 'text-yellow-500'
    : 'text-teal-400'; 

  const timeDisplay = timeLeft !== null ? formatTime(timeLeft) : 'Cargando...';

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="
        flex 
        flex-col-reverse 
        lg:flex-row 
        items-center 
        justify-center 
        min-h-screen 
        bg-gray-900 
        text-white 
        font-sans 
        p-4
        sm:p-6 
        md:p-8
        gap-6
        md:gap-8
        lg:gap-12
      ">
        
        {/* TEMPORIZADOR */}
        <div className="
          fixed 
          top-20
          sm:top-24
          md:top-28
          left-1/2 
          transform 
          -translate-x-1/2 
          p-4
          md:p-5
          glass-effect
          rounded-2xl 
          shadow-2xl 
          border-2
          border-gray-700/80
          z-10
          animate-scale-in
        ">
            <h3 className="text-xs sm:text-sm font-light text-gray-400 text-center mb-1">Tiempo restante</h3>
            <p className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center ${timerColor}`}>
                {timeDisplay}
            </p>
            {!isTimerRunning && timeLeft !== null && !isGameOver && (
                 <span className="text-xs text-yellow-400 block mt-1 text-center">Pausado (Tutorial)</span>
            )}
        </div>

        <PlayerRack player={player}>
          <p id="player-score" className="
            text-xl 
            md:text-2xl
            font-bold
            text-teal-400
            mb-2
          ">Puntuación: {player.score}</p> 
          
          <button 
              id="end-turn-button"
              onClick={handleEndTurn}
              disabled={currentPlayTiles.length === 0 || isGameOver || timeLeft === null}
              className={`
                mt-4 
                p-3
                md:p-4
                rounded-xl 
                font-semibold 
                transition-all
                duration-200
                w-full
                text-base
                md:text-lg
                transform
                hover:scale-105
                active:scale-95
                shadow-lg
                ${
                  isGameOver 
                    ? 'bg-red-800 cursor-not-allowed opacity-60' 
                    : currentPlayTiles.length > 0 
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 hover:shadow-teal-500/50' 
                      : 'bg-gray-600 cursor-not-allowed opacity-60'
              }`}
          >
              {isGameOver ? 'Juego Terminado 💀' : 'Terminar Turno'}
          </button>
          
          <div id="player-rack-area" className="mt-4 md:mt-6">
             <Rack tiles={tiles} tileLocations={tileLocations} />
          </div>
        </PlayerRack>

        <div 
          id="game-board-area"
          className="
            my-8
            lg:my-0
            bg-gradient-to-br 
            from-blue-800/80
            via-teal-600/60
            to-teal-400/80
            p-3
            sm:p-4
            md:p-6 
            backdrop-blur-md 
            rounded-3xl 
            shadow-2xl 
            border-2
            border-gray-700/50
            hover:border-teal-500/50
            transition-all
            duration-300
          "
        >
          <Board tiles={tiles} tileLocations={tileLocations} />
        </div>
        
        <MessageBox message={message} onClose={hideMessage} />
      </div>
    </DndContext>
  );
}

export default Gamepage;