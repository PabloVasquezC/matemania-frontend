import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import Rack from "../../components/Rack/Rack";
import Board from "../../components/Board/Board";
import { useState, useEffect } from "react";
import { OPERATORS, TILES_COLORS } from "@constants/constants";


import type { ITile } from "../../types/ITile";
import { TILES } from "@constants/constants";
import PlayerRack from "@components/PlayerRack/PlayerRack";

function Gamepage() {
const EQUALS_TILES = TILES.filter(tile => tile.value === OPERATORS.EQUALS);
const NUMBER_TILES = TILES.filter(tile => typeof tile.value === 'number');
const OPERATOR_TILES = TILES.filter(tile => tile.bgColor === TILES_COLORS.OPERATOR);

  const [player, setPlayer] = useState<{ name: string; isActive: boolean; id: string, score: number }>({ name: "Player 1", isActive: true, id: "player-1", score: 0 });
  const [tiles, setTiles] = useState<ITile[]>([]);
  const [tileLocations, setTileLocations] = useState<Record<string, string>>(
    {}
  );  

  // Actualiza el estado del jugador (ejemplo)
  const updatePlayer = (newData: Partial<typeof player>) => {
    setPlayer((prev) => ({ ...prev, ...newData }));
  };

  // Primero, clasifica tus fichas en grupos

const generateRandomTiles = (count: number): ITile[] => {
  const newTiles: ITile[] = [];

  for (let i = 0; i < count; i++) {
    let selectedTile: ITile;
    const randomCategory = Math.random(); // Genera un número entre 0 y 1

    if (randomCategory < 0.2) {
      // 20% de probabilidad para el signo igual
      const randomIndex = Math.floor(Math.random() * EQUALS_TILES.length);
      selectedTile = EQUALS_TILES[randomIndex];
    } else if (randomCategory < 0.7) {
      // 50% de probabilidad para los números (0.2 + 0.5 = 0.7)
      const randomIndex = Math.floor(Math.random() * NUMBER_TILES.length);
      selectedTile = NUMBER_TILES[randomIndex];
    } else {
      // 30% de probabilidad para los operadores (0.7 + 0.3 = 1.0)
      const randomIndex = Math.floor(Math.random() * OPERATOR_TILES.length);
      selectedTile = OPERATOR_TILES[randomIndex];
    }

    const newTile: ITile = {
      ...selectedTile,
      id: `tile-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    };
    newTiles.push(newTile);
  }

  return newTiles;
};

  // Genera las fichas iniciales
  useEffect(() => {
    const initialTiles = generateRandomTiles(30);
    setTiles(initialTiles);

    const initialLocations: Record<string, string> = {};
    initialTiles.forEach((tile) => {
      initialLocations[tile.id] = "pool";
    });
    setTileLocations(initialLocations);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
  const { over, active } = event;

  if (!over) return;

  const isMovedFromRackToBoard =
    tileLocations[active.id] === "pool" && String(over.id).startsWith("square");

  if (isMovedFromRackToBoard) {
    // 1. Crear ficha nueva para reponer el rack
    const newRandomTile = generateRandomTiles(1)[0];

    // 2. Actualizar tiles (agregando la nueva en vez de reemplazar)
    setTiles(prev => [...prev, newRandomTile]);

    // 3. Actualizar ubicaciones
    setTileLocations(prev => ({
      ...prev,
      [active.id]: String(over.id),   // ficha jugada -> tablero
      [newRandomTile.id]: "pool",     // ficha nueva -> rack
    }));
  } else {
    // Movimientos internos (rack-to-rack, board-to-board, etc.)
    setTileLocations(prev => ({
      ...prev,
      [active.id]: String(over.id),
    }));
  }
};

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
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white font-sans p-6 space-y-6 md:space-y-0 md:space-x-12">
        {/* Atril / Rack del Jugador */}
        <PlayerRack player={player}>
          <Rack tiles={tiles} tileLocations={tileLocations} />
          <button onClick={() => updatePlayer({ score: player.score + 1 })}>Click Me</button>
        </PlayerRack>
        
        {/* Tablero */}
        <div className="bg-gradient-to-r from-blue-800 to-teal-400 p-2 md:p-6  backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50">
          <Board tiles={tiles} tileLocations={tileLocations} />
        </div>

        
      </div>
    </DndContext>
  );
}

export default Gamepage;