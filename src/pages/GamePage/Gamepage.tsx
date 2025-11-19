import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
// Re-introduciendo las importaciones del juego que funcionaban en tu entorno
import Rack from "../../components/Rack/Rack"; 
import Board from "../../components/Board/Board"; 
import PlayerRack from "../../components/PlayerRack/PlayerRack";
import generateRandomTiles from "../../utils/others/generate_random_tiles";
import createHandleDragEnd from "../../utils/drag&drop/handle_drag_end";
import { getPlaySequences } from "../../utils/others/board_scanner"; 
import playValidations from "../../utils/validations/play_validations"; 
// Fin de las importaciones re-introducidas

import { useState, useEffect, useCallback } from "react"; 
import type { ITile } from "../../types/ITile";

// Shepherd
import Shepherd, { type StepOptions } from 'shepherd.js';
import './shepherd-custom.css'; 

// ⭐️ INTERFACE para el sistema de mensajes
interface MessageState {
    visible: boolean;
    text: string;
    type: 'success' | 'error' | 'info';
}

// ⭐️ COMPONENTE: Reemplazo para alert()
const MessageBox = ({ message, onClose }: { message: MessageState, onClose: () => void }) => {
    if (!message.visible) return null;

    const baseClasses = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-6 rounded-xl shadow-2xl transition-opacity duration-300 max-w-sm w-11/12 text-center font-bold text-white transform scale-100";
    let colorClasses = "";
    
    switch (message.type) {
        case 'success':
            colorClasses = "bg-green-600/90 border-4 border-green-400";
            break;
        case 'error':
            colorClasses = "bg-red-600/90 border-4 border-red-400";
            break;
        case 'info':
            colorClasses = "bg-blue-600/90 border-4 border-blue-400";
            break;
    }

    return (
        <div className={`${baseClasses} ${colorClasses} animate-bounceIn`}>
            <p className="text-lg mb-4">{message.text}</p>
            <button 
                onClick={onClose}
                className="bg-white text-gray-800 font-semibold py-1 px-4 rounded-full hover:bg-gray-200 transition"
            >
                Aceptar
            </button>
        </div>
    );
}

// ⭐️ UTILIDAD: Formatea segundos a MM:SS
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
  
  // 🆕 NUEVO ESTADO: Controla si el reloj debe correr o no
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

  // ⭐️ LÓGICA DEL TOUR MODIFICADA
  useEffect(() => {
    // Si ya vio el tour, activamos el reloj INMEDIATAMENTE y salimos
    if (localStorage.getItem('matemania_game_tour_seen')) {
        setIsTimerRunning(true); 
        return;
    }

    // Si no lo ha visto, el reloj sigue en false (pausado) por defecto
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
          text: '1. TUS FICHAS: Aquí comienza todo. Estas son tus piezas disponibles. Arrástralas al tablero para jugar.',
          attachTo: { element: '#player-rack-area', on: 'top' }, 
          buttons: [
            { text: 'Omitir', action: tour.cancel }, 
            { text: 'Siguiente', action: tour.next }
          ]
        },
        {
          id: 'board-intro',
          text: '2. EL TABLERO: Suelta las fichas aquí. Debes formar ecuaciones matemáticas válidas (ej: 2+2=4).',
          attachTo: { element: '#game-board-area', on: 'left' }, 
          buttons: [
            { text: 'Anterior', action: tour.back },
            { text: 'Siguiente', action: tour.next }
          ]
        },
        {
          id: 'score-intro',
          text: '3. PUNTUACIÓN: Mantén un ojo en tus puntos acumulados aquí.',
          attachTo: { element: '#player-score', on: 'bottom' }, 
          buttons: [
            { text: 'Anterior', action: tour.back },
            { text: 'Siguiente', action: tour.next }
          ]
        },
        {
          id: 'validate-btn',
          text: '4. VALIDAR: ¡Importante! Cuando termines tu ecuación, pulsa este botón para finalizar el turno.',
          attachTo: { element: '#end-turn-button', on: 'top' }, 
          buttons: [
            { text: 'Anterior', action: tour.back },
            { text: '¡Entendido!', action: tour.complete } // Al completar, se dispara el evento complete
          ]
        }
    ];

    tour.addSteps(steps);

    // 🆕 Función para marcar como visto Y arrancar el reloj
    const finishTour = () => {
        localStorage.setItem('matemania_game_tour_seen', 'true');
        setIsTimerRunning(true); // <--- AQUÍ ARRANCA EL RELOJ
    };

    tour.on('complete', finishTour);
    tour.on('cancel', finishTour); // Si lo cancela, también arranca

    const timer = setTimeout(() => {
        const rackElement = document.querySelector('#player-rack-area');
        if (rackElement) {
            tour.start();
        } else {
            console.warn("Shepherd: No se encontró el Rack, abortando tour.");
            // Si falla el tour por alguna razón, arrancamos el reloj por seguridad
            setIsTimerRunning(true);
        }
    }, 1000);

    return () => {
        clearTimeout(timer);
        if (tour.isActive()) {
            tour.cancel();
        }
    };
  }, []); // Array vacío, solo al montar

  
  // ⭐️ LÓGICA INICIAL DEL JUEGO (Carga de datos)
  useEffect(() => {
    const gameMode = localStorage.getItem("mode") || "matematico"; 
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setPlayer((prev) => ({ ...prev, name: storedUsername }));

    const storedTimeLimit = localStorage.getItem("timeLimit");
    const initialTime = parseInt(storedTimeLimit || "180", 10); 
    
    setTimeLeft(initialTime); 
    // NOTA: Aquí NO activamos isTimerRunning. Esperamos al Tour.

    const initialTiles = generateRandomTiles(30, gameMode); 
    setTiles(initialTiles);

    const initialLocations: Record<string, string> = {};
    initialTiles.forEach((tile) => initialLocations[tile.id] = "pool");
    setTileLocations(initialLocations);
  }, []);

  // ⭐️ LÓGICA DEL TEMPORIZADOR MODIFICADA
  useEffect(() => {
    if (timeLeft === null) return;

    // 🆕 GUARDIA: Si el reloj no debe correr (ej: tour activo), no hacemos nada
    if (!isTimerRunning) return; 

    if (isGameOver || timeLeft <= 0) {
        if (timeLeft === 0 && !isGameOver) {
            setIsGameOver(true);
            showMessage(`⏰ ¡Tiempo agotado! Tu puntuación final es: ${player.score}`, 'error');
        }
        return;
    }

    const intervalId = setInterval(() => {
        setTimeLeft(prevTime => (prevTime !== null ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, isGameOver, showMessage, player.score, isTimerRunning]); // Agregamos isTimerRunning a dependencias

  const handleEndTurn = useCallback(() => {
    if (isGameOver) {
        showMessage("El juego ha terminado. ¡El tiempo se agotó!", 'info');
        return;
    }

    if (currentPlayTiles.length < 3) {
        showMessage("❌ Error: Mínimo 3 fichas para formar una ecuación.", 'error');
        return;
    }
    const firstPlayedTileId = currentPlayTiles[0];
    const scanLocation = tileLocations[firstPlayedTileId]; 
    const { horizontal, vertical } = getPlaySequences(tiles, tileLocations, scanLocation);

    let validPlay = false;
    let totalPlayPoints = 0;
    
    const checkSequenceValidity = (sequence: ITile[]) => {
        if (sequence.length > 2) {
             const allPlayedTilesAreContained = currentPlayTiles.every(
                playedId => sequence.some(tile => tile.id === playedId)
            );
            if (allPlayedTilesAreContained) {
                const validation = playValidations(sequence);
                if (validation.isValid) {
                    totalPlayPoints += validation.totalPoints;
                    return true;
                }
            }
        }
        return false;
    };

    if (checkSequenceValidity(horizontal)) validPlay = true;
    if (!validPlay && checkSequenceValidity(vertical)) validPlay = true;

    if (validPlay) {
        updateScore(totalPlayPoints);
        const tilesToReplaceFromRack = tiles.filter(tile => 
             currentPlayTiles.includes(tile.id) && tileLocations[tile.id] === 'pool'
        );
        const newRandomTiles = generateRandomTiles(tilesToReplaceFromRack.length);

        setTiles(prevTiles => {
            const tilesToKeep = prevTiles.filter(tile => !tilesToReplaceFromRack.some(t => t.id === tile.id));
            return [...tilesToKeep, ...newRandomTiles]; 
        });

        setTileLocations(prevLocations => {
            const newLocations = {...prevLocations};
            newRandomTiles.forEach(newTile => newLocations[newTile.id] = "pool");
            return newLocations;
        });
        
        setCurrentPlayTiles([]);
        showMessage(`🎉 ¡Jugada Válida! Puntos: ${totalPlayPoints}`, 'success');
    } else {
        setTileLocations(prev => {
            const revertedLocations = {...prev};
            currentPlayTiles.forEach(id => {
                if (revertedLocations[id].startsWith('square-')) revertedLocations[id] = "pool"; 
            });
            return revertedLocations;
        });
        setCurrentPlayTiles([]);
        showMessage("❌ Jugada Inválida. Revierte las fichas.", 'error');
    }
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
      <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white font-sans p-6 space-y-6 md:space-y-0 md:space-x-12">
        
        {/* TEMPORIZADOR */}
        <div className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 p-3 bg-gray-800/90 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-sm font-light text-gray-400">Tiempo restante:</h3>
            <p className={`text-4xl font-extrabold ${timerColor}`}>
                {timeDisplay}
            </p>
            {/* Indicador visual opcional si está pausado por el tour */}
            {!isTimerRunning && timeLeft !== null && !isGameOver && (
                 <span className="text-xs text-yellow-400 block mt-1">Pausado (Tutorial)</span>
            )}
        </div>


        <PlayerRack player={player}>
          <p id="player-score" className="text-xl font-bold">Puntuación: {player.score}</p> 
          
          <button 
              id="end-turn-button"
              onClick={handleEndTurn}
              disabled={currentPlayTiles.length === 0 || isGameOver || timeLeft === null}
              className={`mt-4 p-3 rounded-lg font-semibold transition-colors w-full ${
                  isGameOver 
                    ? 'bg-red-800 cursor-not-allowed' 
                    : currentPlayTiles.length > 0 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gray-600 cursor-not-allowed'
              }`}
          >
              {isGameOver ? 'Juego Terminado 💀' : 'Terminar Turno'}
          </button>
          
          <div id="player-rack-area" className="mt-4">
             <Rack tiles={tiles} tileLocations={tileLocations} />
          </div>
        </PlayerRack>

        <div 
          id="game-board-area"
          className="my-16 bg-gradient-to-r from-blue-800 to-teal-400 p-2 md:p-6 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50"
        >
          <Board tiles={tiles} tileLocations={tileLocations} />
        </div>
        
        <MessageBox message={message} onClose={hideMessage} />

      </div>
    </DndContext>
  );
}

export default Gamepage;