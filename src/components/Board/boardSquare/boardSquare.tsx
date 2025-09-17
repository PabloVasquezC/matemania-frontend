import { useDroppable } from "@dnd-kit/core";
import type { IBoardSquareProps } from "../../../types/IBoardSquareProps";

function BoardSquare({ id, children, isInCross }: IBoardSquareProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const baseClasses = `
    border 
    border-gray-700 
    shadow-inner 
    h-8 
    w-8 
    md:w-14 
    md:h-14 
    flex 
    items-center 
    justify-center 
    transition-colors 
    duration-200 
  `;

  const crossClasses = `
    bg-gradient-to-br from-purple-500/30 to-rose-500/30 
    border-purple-600 
    hover:bg-gradient-to-br hover:from-purple-500/50 hover:to-rose-500/50
  `;

  const normalClasses = `
    bg-gray-800/20 
    hover:bg-gray-700/30
  `;

  const overClasses = `
    bg-gradient-to-r from-blue-500/40 to-indigo-500/40
  `;

  return (
    <div
      ref={setNodeRef}
      className={`
        ${baseClasses}
        ${isInCross ? crossClasses : normalClasses}
        ${isOver ? overClasses : ''}
      `}
    >
      {children}
    </div>
  );
}

export default BoardSquare;