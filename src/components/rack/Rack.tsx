import Tile from "../tile/Tile";


interface RackProps {
  tiles: Array<{
    id: string;
    value: string | number;
    points: number;
    bgColor: string;
  }>;
  tileLocations: Record<string, string>;
}

const Rack = (props: RackProps) => {
  const { tiles } = props;

  interface TileProps {
    id: string;
    value: string | number;
    points: number;
    bgColor: string;
  }

  return (
    <div className="rack bg-green-600 p-4 flex rounded-2xl shadow-lg shadow-black">
      {tiles
        .filter((t: TileProps) => props.tileLocations[t.id] === "pool")
        .map((tile: TileProps) => (
          <Tile key={tile.id} {...tile} />
        ))}
    </div>
  );
};

export default Rack;
