import BoardSquare from "./boardSquare/boardSquare";
import Tile from "../Tile/Tile";
import type { IBoardProps } from "../../types/IBoardProps";

export default function Board(props: IBoardProps) {
  const rows = 11;
  const cols = 11;

  const renderSquares = () => {
    const squares = [];
    for (let i = 0; i < rows * cols; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const squareId = `square-${row}-${col}`;

      // booleano que indica si la casilla está en la cruz en forma de X
      const isInCross = row === col || row + col === cols - 1;

      squares.push(
        <BoardSquare key={squareId} id={squareId} isInCross={isInCross}>
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
      className="
        grid  
        aspect-square 
        bg-gray-800 
        rounded-lg 
        shadow-xl 
        border-4 
        border-gray-700 
        mx-auto
      "
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {renderSquares()}
    </div>
  );
}
