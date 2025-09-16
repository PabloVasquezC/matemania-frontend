import { useDroppable } from "@dnd-kit/core";
import type { IBoardSquareProps } from "../../../types/IBoardSquareProps";



function BoardSquare({ id, children}: IBoardSquareProps) {

  const { isOver, setNodeRef } = useDroppable({ id });


  const style = {
    // Si la casilla está encima de una ficha, aplica un degradado de acento
    background: isOver ? "linear-gradient(to right, rgba(59, 130, 246, 0.4), rgba(99, 102, 241, 0.4))" : "transparent",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
        border 
        border-gray-700 
        h-8 
        w-8 
        md:w-14 
        md:h-14 
        
        flex 
        items-center 
        justify-center 
        transition-colors 
        duration-200 
        hover:bg-gray-700/30
        "
    >
      {children}
    </div>
  );
}

export default BoardSquare;