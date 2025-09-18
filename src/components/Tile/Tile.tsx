import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ITile } from "../../types/ITile";

const Tile = ({ id, value, points, bgColor }: ITile) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    // Aplica una sombra suave y azulada cuando está en drag
    boxShadow: isDragging
      ? "0px 6px 15px rgba(0, 150, 255, 0.7)" // Sombra de arrastre
      : "0px 1px 2px rgba(0, 0, 0, 0.1)", // Sombra por defecto, si la tienes
    zIndex: isDragging ? 9999 : 1, // Asegura que quede encima
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        relative 
        cursor-grab
        active:cursor-grabbing
        font-bold 
        text-xl
          sm:text-2xl
        md:text-3xl 
        flex 
        items-center 
        justify-center 
        rounded-sm 
        h-6 
        w-6 
        sm:h-10 
        sm:w-10 
        lg:h-12 
        lg:w-12 
        md:w-14 
        md:h-14 
        m-1
        transition-shadow 
        duration-200
        ${bgColor}
      `}
    >
      <span className="text-black">{value}</span>
      <span className="text-gray-800 text-xs absolute bottom-0.5 right-0.5">
        {points}
      </span>
    </div>
  );
};

export default Tile;
