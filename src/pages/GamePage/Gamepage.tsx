import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Rack from "../../components/Rack/Rack";
import Board from "../../components/Board/Board";
import { useState, useEffect, useCallback } from "react"; 

import type { ITile } from "../../types/ITile";
import PlayerRack from "../../components/PlayerRack/PlayerRack";
import generateRandomTiles from "../../utils/others/generate_random_tiles";
import createHandleDragEnd from "../../utils/drag&drop/handle_drag_end";

import { getPlaySequences } from "../../utils/others/board_scanner"; 
import playValidations from "../../utils/validations/play_validations"; 

// Shepherd
import Shepherd, { type StepOptions } from 'shepherd.js';
import './shepherd-custom.css'; 

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

  const updateScore = (points: number) => {
      setPlayer((prev) => ({ ...prev, score: prev.score + points }));
  };

  // ⭐️ LÓGICA DEL TOUR CORREGIDA
  useEffect(() => {
    // 1. Verificar si ya se vio el tour
    if (localStorage.getItem('matemania_game_tour_seen')) return;

    // 2. Crear la instancia PRIMERO para poder usarla en los botones
    const tour = new Shepherd.Tour({
        defaultStepOptions: {
            cancelIcon: { enabled: true },
            classes: 'shepherd-theme-custom', 
            scrollTo: { behavior: 'smooth', block: 'center' },
        },
        useModalOverlay: true
    });

    

    // 3. Definir los pasos DENTRO del useEffect usando la instancia 'tour' directamente
    // Esto arregla el botón "Siguiente" que se quedaba pegado
    const steps: StepOptions[] = [
        {
          id: 'rack-intro',
          text: '1. TUS FICHAS: Aquí comienza todo. Estas son tus piezas disponibles. Arrástralas al tablero para jugar.',
          attachTo: { element: '#player-rack-area', on: 'top' }, 
          buttons: [
            { text: 'Omitir', action: tour.cancel }, 
            { text: 'Siguiente', action: tour.next } // Referencia directa, sin 'this'
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
            { text: '¡Entendido!', action: tour.complete }
          ]
        }
    ];

    tour.addSteps(steps);

    // 4. Eventos para guardar en localStorage
    const markAsSeen = () => localStorage.setItem('matemania_game_tour_seen', 'true');
    tour.on('complete', markAsSeen);
    tour.on('cancel', markAsSeen);

    // 5. Inicio retardado y seguro
    // Esperamos 1 segundo completo para asegurar que React haya pintado el Rack y el Tablero
    const timer = setTimeout(() => {
        const rackElement = document.querySelector('#player-rack-area');
        
        if (rackElement) {
            tour.start();
        } else {
            console.warn("Shepherd: No se encontró el Rack, abortando tour para evitar errores.");
        }
    }, 1000);

    // Limpieza
    return () => {
        clearTimeout(timer);
        if (tour.isActive()) {
            tour.cancel(); // Usamos cancel en lugar de hide para limpiar mejor
        }
    };
  }, []); // Array vacío: Solo al montar

  
  // LÓGICA DEL JUEGO (Sin cambios funcionales)
  useEffect(() => {
    const gameMode = localStorage.getItem("mode") || "matematico"; 
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setPlayer((prev) => ({ ...prev, name: storedUsername }));

    const initialTiles = generateRandomTiles(30, gameMode); 
    setTiles(initialTiles);

    const initialLocations: Record<string, string> = {};
    initialTiles.forEach((tile) => initialLocations[tile.id] = "pool");
    setTileLocations(initialLocations);
  }, []);

  const handleEndTurn = useCallback(() => {
    if (currentPlayTiles.length < 3) {
        alert("❌ Error: Mínimo 3 fichas.");
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
        alert(`🎉 Puntos: ${totalPlayPoints}`);
    } else {
        setTileLocations(prev => {
            const revertedLocations = {...prev};
            currentPlayTiles.forEach(id => {
                if (revertedLocations[id].startsWith('square-')) revertedLocations[id] = "pool"; 
            });
            return revertedLocations;
        });
        setCurrentPlayTiles([]);
        alert("❌ Inválida");
    }
  }, [currentPlayTiles, tileLocations, tiles, updateScore]); 

  const handleDragEnd = createHandleDragEnd({
      tileLocations, setTiles, setTileLocations, tiles, updateScore, setCurrentPlayTiles 
  });
  
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white font-sans p-6 space-y-6 md:space-y-0 md:space-x-12">
        
        <PlayerRack player={player}>
          {/* ID Score */}
          <p id="player-score" className="text-xl font-bold">Puntuación: {player.score}</p> 
          
          {/* ID Botón Validar */}
          <button 
              id="end-turn-button"
              onClick={handleEndTurn}
              disabled={currentPlayTiles.length === 0}
              className={`mt-4 p-3 rounded-lg font-semibold transition-colors ${currentPlayTiles.length > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'}`}
          >
              Terminar Turno
          </button>
          
          {/* ID Rack (Contenedor) */}
          <div id="player-rack-area" className="mt-4">
             <Rack tiles={tiles} tileLocations={tileLocations} />
          </div>
        </PlayerRack>

        {/* ID Tablero */}
        <div 
          id="game-board-area"
          className="my-16 bg-gradient-to-r from-blue-800 to-teal-400 p-2 md:p-6 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50"
        >
          <Board tiles={tiles} tileLocations={tileLocations} />
        </div>

      </div>
    </DndContext>
  );
}

export default Gamepage;