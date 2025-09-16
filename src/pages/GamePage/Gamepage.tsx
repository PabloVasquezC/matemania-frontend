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

import type { ITile } from "../../types/ITile";
import { TILES } from "@constants/constants";

function Gamepage() {
  const [tiles, setTiles] = useState<ITile[]>([]);
  const [tileLocations, setTileLocations] = useState<Record<string, string>>(
    {}
  );

  // Función para generar fichas aleatorias
  const generateRandomTiles = (count: number): ITile[] => {
    const newTiles: ITile[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * TILES.length);
      const newTile: ITile = {
        ...TILES[randomIndex],
        id: `tile-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // id único mejorado
      };
      newTiles.push(newTile);
    }
    return newTiles;
  };

  // Genera las fichas iniciales
  useEffect(() => {
    const initialTiles = generateRandomTiles(10);
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans p-6">
        {/* Tablero */}
        <div className="mt-20 mb-20 bg-gradient-to-r from-blue-800 to-teal-400 p-2 md:p-6  backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50">
          <Board tiles={tiles} tileLocations={tileLocations} />
        </div>

        {/* Atril / Rack */}
        <div className="p-4 md:p-6 bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50">
          <Rack tiles={tiles} tileLocations={tileLocations} />
        </div>
      </div>
    </DndContext>
  );
}

export default Gamepage;
