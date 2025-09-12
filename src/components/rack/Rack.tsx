import type { RackProps } from "../../types/IRackProps";
import type { ITile } from "../../types/ITile";
import Tile from "../tile/Tile";




const Rack = (props: RackProps) => {
  const { tiles } = props;

  return (
    <div className="m-4 rack bg-green-600 p-4 flex flex-wrap justify-center rounded-2xl shadow-md shadow-black">
      {tiles
        .filter((tile: ITile) => props.tileLocations[tile.id] === "pool")
        .map((tile: ITile) => (
          <Tile key={tile.id} {...tile} />
        ))}
    </div>
  );
};

export default Rack;
