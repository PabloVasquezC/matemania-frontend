import type { ITile } from "../../types/ITile";
import Tile from "../tile/Tile";


interface RackProps {
  tiles: ITile[];
  tileLocations: Record<string, string>;
}

const Rack = (props: RackProps) => {
  const { tiles } = props;

  return (
    <div className="rack bg-green-600 p-4 flex rounded-2xl shadow-lg shadow-black">
      {tiles
        .filter((tile: ITile) => props.tileLocations[tile.id] === "pool")
        .map((tile: ITile) => (
          <Tile key={tile.id} {...tile} />
        ))}
    </div>
  );
};

export default Rack;
