import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";

export const Terminal = ({ onClose }: { onClose: () => void }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    
    <div
    	className=" justify-center items-center fixed z-50 w-full max-w-xl p-1 bg-gray-900 rounded-lg shadow-2xl overflow-hidden font-mono"
      style={{ top: position.y, left: position.x }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="flex items-center justify-between p-2 cursor-grab text-white bg-gray-800 rounded-t-lg"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-semibold">Terminal</span>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full transition-colors duration-200">
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto text-sm text-gray-200 bg-gray-950 rounded-b-lg border-t border-gray-800">
        <p className="text-lime-400">$ Bienvenido a la terminal de CogniTiles...</p>
        <p className="text-gray-400">Escribe 'ayuda' para ver los comandos disponibles.</p>
        <p className="mt-2 text-lime-400">$</p>
      </div>
    </div>
  );
};