import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import Rack from "../../components/rack/Rack";
import Board from "../../components/board/Board";
import { useState } from "react";
import { OPERATORS, TILES_COLORS, TILES_POINTS } from "../../constants/constants";
import play_validations from "../../utils/play_validations";

function Gamepage() {
  const [tiles] = useState([
    {
      id: "tile-1",
      value: 7,
      points: TILES_POINTS[7],
      bgColor: TILES_COLORS.NUMBER,
    },
    {
      id: "tile-2",
      value: OPERATORS.ADD,
      points: TILES_POINTS["+"] ?? 0,
      bgColor: TILES_COLORS.OPERATOR,
    },
    {
      id: "tile-3",
      value: 5,
      points: TILES_POINTS[5],
      bgColor: TILES_COLORS.NUMBER,
    },
    {
      id: "tile-4",
      value: OPERATORS.SUBTRACT,
      points: TILES_POINTS["-"] ?? 0,
      bgColor: TILES_COLORS.OPERATOR,
    },
    {
      id: "tile-5",
      value: 3,
      points: TILES_POINTS[3],
      bgColor: TILES_COLORS.NUMBER,
    },
    {
      id: "tile-6",
      value: OPERATORS.EQUALS,
      points: TILES_POINTS["="] ?? 0,
      bgColor: TILES_COLORS.EQUAL,
    },
    {
      id: "tile-7",
      value: 9,
      points: TILES_POINTS[9],
      bgColor: TILES_COLORS.NUMBER,
    },
    {
      id: "tile-8",
      value: 1,
      points: TILES_POINTS[1],
      bgColor: TILES_COLORS.NUMBER,
    },
    {
      id: "tile-9",
      value: 4,
      points: TILES_POINTS[4],
      bgColor: TILES_COLORS.NUMBER,
    },
    {
      id: "tile-10",
      value: 6,
      points: TILES_POINTS[6],
      bgColor: TILES_COLORS.NUMBER,
    },
  ]);

  const [tileLocations, setTileLocations] = useState<Record<string, string>>({
    "tile-1": "pool",
    "tile-2": "pool",
    "tile-3": "pool",
    "tile-4": "pool",
    "tile-5": "pool",
    "tile-6": "pool",
    "tile-7": "pool",
    
  });

  const handleDragEnd = (event: unknown) => {
    const { over, active } = event as { over: { id: string }; active: { id: string } };

    if (over) {
      setTileLocations((prev) => ({
        ...prev,
        [active.id]: over.id,
      }));
    }
  };

  // ⭐️ ¡Aquí está la solución! Configuración de los sensores para móvil y escritorio.
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, 
        tolerance: 5,
      },
    })
  );

  console.log(play_validations(tiles));

  return (
    // ⭐️ Pasamos los sensores al DndContext
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      
      {/* Contenedor principal con flexbox para centrar y organizar los componentes */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
        {/* Aquí puedes agregar un título o cabecera si lo deseas */}
        <h1 className="text-4xl text-center font-bold text-blue-800">Juego de Scrabble Matemático</h1>
        
        {/* Contenedor del tablero */}
        <div className="mb-8">
          <Board tiles={tiles} tileLocations={tileLocations} />
        </div>

        {/* Contenedor del atril */}
        <div>
          <Rack tiles={tiles} tileLocations={tileLocations} />
        </div>
      </div>
    </DndContext>
  );
}

export default Gamepage;