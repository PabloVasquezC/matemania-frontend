import { DndContext } from "@dnd-kit/core";
import Tile from "../../components/tile/Tile";
import { useState } from "react";
import { TILES_COLORS, TILES_POINTS, OPERATORS } from "../../constants/constants";
import BoardSquare from "../../components/board/boardSquare/boardSquare";

function TestComponentsPage() {
  // tiles fijos (generados una vez)
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
  ]);

  // ubicación de cada tile: "pool" o el id del BoardSquare
  const [tileLocations, setTileLocations] = useState<Record<string, string>>({
    "tile-1": "pool",
    "tile-2": "pool",
  });

  const handleDragEnd = (event: any) => {
    const { over, active } = event;

    if (over) {
      setTileLocations((prev) => ({
        ...prev,
        [active.id]: over.id, // mover la tile al square
      }));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-8">
        {/* Pool inicial */}
        <div className="flex flex-col items-center">
          <h2 className="mb-2 font-bold">Pool</h2>
          <div className="flex gap-2">
            {tiles
              .filter((t) => tileLocations[t.id] === "pool")
              .map((tile) => (
                <Tile key={tile.id} {...tile} />
              ))}
          </div>
        </div>

        {/* Board con squares */}
        <div className="flex flex-col items-center">
          <h2 className="mb-2 font-bold">Board</h2>
          <div className="flex ">
            {["square-1", "square-2"].map((squareId) => (
              <BoardSquare key={squareId} id={squareId}>
                {tiles
                  .filter((t) => tileLocations[t.id] === squareId)
                  .map((tile) => (
                    <Tile key={tile.id} {...tile} />
                  ))}
              </BoardSquare>
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default TestComponentsPage;
