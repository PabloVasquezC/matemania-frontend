import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import Rack from "../../components/rack/Rack";
import Board from "../../components/board/Board";
import { useState } from "react";
import { OPERATORS, TILES_COLORS, TILES_POINTS } from "../../constants/constants";
// Se elimina la importación de play_validations ya que no se utiliza en esta versión
// import play_validations from "../../utils/play_validations";
import logo from "../../assets/logo.png";

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
    {
      id: "tile-11",
      value: 2,
      points: TILES_POINTS[2],
      bgColor: TILES_COLORS.NUMBER,
    },
    {
      id: "tile-12",
      value: 8,
      points: TILES_POINTS[8],
      bgColor: TILES_COLORS.NUMBER,
    },
    {
      id: "tile-13",
      value: OPERATORS.MULTIPLY,
      points: TILES_POINTS["*"] ?? 0,
      bgColor: TILES_COLORS.OPERATOR,
    },
    {
      id: "tile-14",
      value: OPERATORS.DIVIDE,
      points: TILES_POINTS["/"] ?? 0,
      bgColor: TILES_COLORS.OPERATOR,
    },
  ]);

  const [tileLocations, setTileLocations] = useState({
    "tile-1": "pool",
    "tile-2": "pool",
    "tile-3": "pool",
    "tile-4": "pool",
    "tile-5": "pool",
    "tile-6": "pool",
    "tile-7": "pool",
    "tile-8": "pool",
    "tile-9": "pool",
    "tile-10": "pool",
    "tile-11": "pool",
    "tile-12": "pool",
    "tile-13": "pool",
    "tile-14": "pool",
  });

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over) {
      setTileLocations((prev) => ({
        ...prev,
        [active.id]: over.id,
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
      {/* Contenedor principal con estilo moderno y oscuro */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans p-6">
        
        {/* Título y logo con el mismo estilo que la página 'AboutPage' */}
        <div className="flex flex-col items-center mb-6">
         
        </div>
        
        {/* Contenedor del tablero con estilo mejorado */}
        <div className="mb-8 p-4 md:p-6 bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50">
          <Board tiles={tiles} tileLocations={tileLocations} />
        </div>

        {/* Contenedor del atril con estilo mejorado */}
        <div className="p-4 md:p-6 bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50">
          <Rack tiles={tiles} tileLocations={tileLocations} />
        </div>
      </div>
    </DndContext>
  );
}

export default Gamepage;