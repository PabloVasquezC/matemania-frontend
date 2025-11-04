import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Rack from "../../components/Rack/Rack";
import Board from "../../components/Board/Board";
import { useState, useEffect, useCallback } from "react"; // 💡 Se agrega useCallback para handleEndTurn

import type { ITile } from "../../types/ITile";
import PlayerRack from "../../components/PlayerRack/PlayerRack";
import generateRandomTiles from "../../utils/generate_random_tiles";
import createHandleDragEnd from "../../utils/handle_drag_end";

// 💡 IMPORTACIONES NECESARIAS PARA LA VALIDACIÓN FINAL
import { getPlaySequences } from "../../utils/board_scanner"; 
import playValidations from "../../utils/play_validations"; 
// ----------------------------------------------------


function Gamepage() {
  const [currentPlayTiles, setCurrentPlayTiles] = useState<string[]>([]);
  const [player, setPlayer] = useState<{
    name: string;
    isActive: boolean;
    id: string;
    score: number;
  }>({ name: "Player 1", isActive: true, id: "player-1", score: 0 });
  
  const [tiles, setTiles] = useState<ITile[]>([]);
  const [tileLocations, setTileLocations] = useState<Record<string, string>>(
    {}
  );

  const updateScore = (points: number) => {
      setPlayer((prev) => ({ 
          ...prev, 
          score: prev.score + points 
      }));
  };


  // ⭐️ 1. Lógica de inicialización
  useEffect(() => {
    // 1. Obtener el modo de juego y el nombre de usuario
    const gameMode = localStorage.getItem("mode") || "matematico"; 
    const storedUsername = localStorage.getItem("username");
    
    if (storedUsername) {
        setPlayer((prev) => ({ ...prev, name: storedUsername }));
    }

    // 2. Generar fichas con el modo correcto
    // Nota: Si el rack inicial no es de 7, ajusta este número (e.g., a 30 para el ejemplo)
    const initialTiles = generateRandomTiles(30, gameMode); 
    
    setTiles(initialTiles);

    const initialLocations: Record<string, string> = {};
    initialTiles.forEach((tile) => {
      initialLocations[tile.id] = "pool";
    });
    setTileLocations(initialLocations);
  }, []);

  
  // ⭐️ 2. Función de Validación y Término de Turno (handleEndTurn)
  // Usamos useCallback para que solo se defina una vez y no rompa dependencias
  // Define esta función DENTRO de tu componente principal (Gamepage.tsx)
// Asegúrate de que tienes estas dependencias importadas: getPlaySequences, playValidations, generateRandomTiles

const handleEndTurn = useCallback(() => {
    
    // 1. CHEQUEO INICIAL: Mínimo de fichas jugadas
    if (currentPlayTiles.length < 3) {
        alert("❌ Error: La jugada debe formar una ecuación válida de al menos 3 fichas (Ej: 1=1).");
        return;
    }

    // 2. DETERMINAR EL PUNTO DE ESCANEO
    const firstPlayedTileId = currentPlayTiles[0];
    const scanLocation = tileLocations[firstPlayedTileId]; 
    
    // ... (Chequeos de scanLocation) ...

    // 3. ESCANEAR SECUENCIAS
    const { horizontal, vertical } = getPlaySequences(
        tiles, 
        tileLocations, 
        scanLocation 
    );

    let validPlay = false;
    let totalPlayPoints = 0;
    
    // --- LÓGICA DE VALIDACIÓN (Debe estar aquí, usando playValidations) ---
    
    const checkSequenceValidity = (sequence: ITile[]) => {
        // ... (Tu lógica para verificar longitud, contención de currentPlayTiles, y llamar a playValidations) ...
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

    if (checkSequenceValidity(horizontal)) {
        validPlay = true;
    }
    // Lógica para vertical (si es una secuencia distinta y válida)
    if (!validPlay && checkSequenceValidity(vertical)) { 
         validPlay = true;
    }


    // 4. DECISIÓN FINAL: ACEPTAR O RECHAZAR

    if (validPlay) {
        // --- ACEPTAR JUGADA ---
        
        // a) Actualizar la puntuación
        updateScore(totalPlayPoints);

        // b) Determinar cuántas fichas reponer (solo las que estaban en el rack al inicio del turno)
        const tilesToReplaceFromRack = tiles.filter(tile => 
             currentPlayTiles.includes(tile.id) && tileLocations[tile.id] === 'pool'
        );
        const numTilesToReplace = tilesToReplaceFromRack.length;
        const newRandomTiles = generateRandomTiles(numTilesToReplace);

        
        // 🛑 CORRECCIÓN CRUCIAL: MANTENER FICHAS JUGADAS Y REEMPLAZAR SOLO LAS QUE ERAN DEL RACK
        setTiles(prevTiles => {
            // 1. Fichas a mantener: todas las que no fueron jugadas O las que fueron jugadas y ya están en el tablero.
            const tilesToKeep = prevTiles.filter(tile => !tilesToReplaceFromRack.some(t => t.id === tile.id));
            
            // 2. Retornar las fichas que se quedan + las nuevas fichas para el rack.
            return [...tilesToKeep, ...newRandomTiles]; 
        });


        // c) Actualizar `tileLocations` para asignar las nuevas fichas al "pool"
        setTileLocations(prevLocations => {
            const newLocations = {...prevLocations};
            newRandomTiles.forEach(newTile => {
                newLocations[newTile.id] = "pool";
            });
            // Las ubicaciones de las fichas jugadas (square-R-C) NO se tocan, por lo que permanecen fijas.
            return newLocations;
        });
        // ------------------- FIN DE CORRECCIÓN -------------------
        
        setCurrentPlayTiles([]);
        alert(`🎉 ¡Jugada válida! Ganaste ${totalPlayPoints} puntos.`);

    } else {
        // --- RECHAZAR JUGADA (Lógica de reversión que ya estaba bien) ---
        
        setTileLocations(prev => {
            const revertedLocations = {...prev};
            currentPlayTiles.forEach(id => {
                if (revertedLocations[id].startsWith('square-')) {
                    revertedLocations[id] = "pool"; // Devuelve la ficha al rack
                }
            });
            return revertedLocations;
        });

        setCurrentPlayTiles([]);
        alert("❌ Jugada Inválida: Fichas devueltas al Rack.");
    }
}, [currentPlayTiles, tileLocations, tiles, updateScore]); // Dependencias

  
  // ⭐️ 3. Crear el handler de arrastre (usa el estado actual de tiles)
  // Este handler solo mueve las fichas y registra el drop en currentPlayTiles
  const handleDragEnd = createHandleDragEnd({
      tileLocations,
      setTiles,
      setTileLocations,
      tiles, 
      updateScore, 
      setCurrentPlayTiles 
  });
  

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div
        className="
        flex 
        flex-col-reverse    
        md:flex-row         
        items-center 
        justify-center 
        min-h-screen 
        bg-gray-900 
        text-white 
        font-sans 
        p-6 
        space-y-6 
        md:space-y-0 
        md:space-x-12
      "
      >
        {/* Rack del Jugador y Controles */}
        <PlayerRack player={player}>
          <p className="text-xl font-bold">Puntuación: {player.score}</p> 
          
          {/* Botón de Validación del Turno */}
          <button 
              onClick={handleEndTurn}
              disabled={currentPlayTiles.length === 0}
              className={`
                mt-4 p-3 rounded-lg font-semibold transition-colors 
                ${currentPlayTiles.length > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'}
              `}
          >
              Terminar Turno y Validar ({currentPlayTiles.length} fichas)
          </button>
          
          <Rack tiles={tiles} tileLocations={tileLocations} />
        </PlayerRack>

        {/* Tablero */}
        <div className="my-16 bg-gradient-to-r from-blue-800 to-teal-400 p-2 md:p-6 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50">
          <Board tiles={tiles} tileLocations={tileLocations} />
        </div>
      </div>
    </DndContext>
  );
}

export default Gamepage;