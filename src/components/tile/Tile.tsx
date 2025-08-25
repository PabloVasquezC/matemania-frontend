import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface ITile {
  id: string;
  value: string | number;
  points: number;
  bgColor: string;
}

const Tile = ({ id, value, points, bgColor }: ITile) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative m-2 cursor-pointer font-bold text-3xl flex items-center justify-center rounded-lg shadow-md h-16 w-16 ${bgColor}`}
    >
      <span className="text-gray-800">{value}</span>
      <span className="text-gray-800 text-lg absolute bottom-1 right-2">
        {points}
      </span>
    </div>
  );
};

export default Tile;
