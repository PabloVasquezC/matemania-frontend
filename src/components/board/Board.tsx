import BoardSquare from "./boardSquare/boardSquare";
import Tile from "../tile/Tile";

interface BoardProps {
  tiles: Array<{
    id: string;
    value: string | number;
    points: number;
    bgColor: string;
  }>;
  tileLocations: Record<string, string>;
}

export default function Board(props: BoardProps) {
  const rows = 8;
  const cols = 8;

  const renderSquares = () => {
    const squares = [];
    for (let i = 0; i < rows * cols; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const squareId = `square-${row}-${col}`;
      squares.push(
        <BoardSquare key={squareId} id={squareId}>
          {props.tiles
            .filter((t) => props.tileLocations[t.id] === squareId)
            .map((tile) => (
              <Tile key={tile.id} {...tile} />
            ))}
        </BoardSquare>
      );
    }
    return squares;
  };

  return (
    <div
      className="grid w-auto h-auto max-w-xl aspect-square bg-gray-800 rounded-lg shadow-xl border-4 border-gray-700 mx-auto transition-all duration-300 transform hover:scale-[1.01]"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {renderSquares()}
    </div>
  );
}