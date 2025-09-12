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
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`hover:shadow-xl relative m-2 cursor-pointer font-bold text-3xl flex items-center justify-center rounded-sm shadow-black shadow-sm h-8 w-8 ${bgColor}`}
    >
      <span className="text-gray-700">{value}</span>
      <span className="text-gray-800 text-xs absolute bottom-0.5 right-0.5">
        {points}
      </span>
    </div>
  );
};

export default Tile;
