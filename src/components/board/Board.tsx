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
  const rows = 10;
  const cols = 10;

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
      className="grid w-full h-auto max-w-xl aspect-square border-2 border-black mx-auto"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {renderSquares()}
    </div>
  );
}