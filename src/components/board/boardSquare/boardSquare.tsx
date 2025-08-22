import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

interface BoardSquareProps {
  id: string;
  children?: ReactNode;
}

function BoardSquare({ id, children }: BoardSquareProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    backgroundColor: isOver ? "lightblue" : "transparent",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-2  border-gray-400 h-24 w-24 flex items-center justify-center"
    >
      {children}
    </div>
  );
}

export default BoardSquare;
