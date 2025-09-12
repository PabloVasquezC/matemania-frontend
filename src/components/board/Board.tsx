import BoardSquare from "./boardSquare/boardSquare";
import Tile from "../tile/Tile";
import type { BoardProps } from "../../types/IBoardProps";



export default function Board(props: BoardProps) {
  const rows = 9;
  const cols = 9;

  // Nueva función para obtener la clase de la cruz
  const getCrossClassNames = (centerRow: number, centerCol: number, currentRow: number, currentCol: number) => {
    if (currentRow === centerRow || currentCol === centerCol) {
      return "bg-lime-500/20";
    }
    return "";
  };

  const renderSquares = () => {
    const squares = [];
    // Define las coordenadas del centro de la cruz. Aquí, el centro es (4, 4) para un tablero de 9x9.
    const centerRow = 4;
    const centerCol = 4;

    for (let i = 0; i < rows * cols; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const squareId = `square-${row}-${col}`;

      // Obtiene la clase de la cruz para el cuadro actual
      const crossClass = getCrossClassNames(centerRow, centerCol, row, col);

      squares.push(
        <BoardSquare key={squareId} id={squareId} extraClassNames={crossClass}>
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
      className="grid w-auto h-auto max-w-xl aspect-square bg-gray-800 rounded-lg shadow-xl border-4 border-gray-700 mx-auto "
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {renderSquares()}
    </div>
  );
}