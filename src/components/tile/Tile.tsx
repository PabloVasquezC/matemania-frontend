import React, { useState } from "react";
import {
  TILES_COLORS,
  TILES_POINTS,
  OPERATORS,
} from "../../constants/constants";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Tile = () => {
  const [tileState] = useState(() => {
    const id = crypto.randomUUID();
    const operatorValues = Object.values(OPERATORS);
    const randomOperator =
      operatorValues[Math.floor(Math.random() * operatorValues.length)];
    const value =
      Math.random() > 0.5 ? Math.floor(Math.random() * 10) : randomOperator;
    const points =
      TILES_POINTS[value as keyof typeof TILES_POINTS] ||
      TILES_POINTS[value.toString() as keyof typeof TILES_POINTS] ||
      0;

    const getColor = (val: typeof value) => {
      if (typeof val === "number") {
        return TILES_COLORS.NUMBER;
      }
      if (val === OPERATORS.EQUALS) {
        return TILES_COLORS.EQUAL;
      }
      return TILES_COLORS.OPERATOR;
    };

    const bgColor = getColor(value);

    return { id, value, points, bgColor };
  });

  const { id, value, points, bgColor } = tileState;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleClick = () => {
    console.table({ id, value, points, bgColor });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      // Agrega 'relative' aquí
      className={`relative m-2 cursor-pointer tile font-bold text-3xl flex items-center justify-center rounded-lg shadow-md h-16 w-16 ${bgColor}`}
    >
      <span className={`text-gray-800`}>{value}</span>
      <span className={`text-gray-800 text-lg absolute bottom-1 right-2`}>
        {points}
      </span>
    </div>
  );
};

export default Tile;