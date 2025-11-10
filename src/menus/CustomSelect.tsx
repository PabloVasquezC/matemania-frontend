import { useState, useRef, useEffect } from 'react';
import playClickSound from "@utils/sounds/play_sound";

// Interfaces (mantienen igual)
interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  options: Option[];
}

export default function CustomSelect({ label, value, onChange, options }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); 

  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption ? selectedOption.label : 'Seleccionar';

  // ... (Hooks y Manejo de Clics Externos se mantienen igual)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    playClickSound(); 
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="mb-6 text-left relative" ref={dropdownRef}>
      <label className="block mb-2 font-semibold text-gray-300">
        {label}
      </label>
      
      {/* Botón que simula el SELECT (mantiene igual) */}
      <button
        type="button"
        onClick={handleToggle}
        className="
          w-full 
          p-3 
          rounded-lg 
          bg-gray-700 
          text-white 
          focus:outline-none 
          focus:ring-2 
          focus:ring-indigo-400 
          text-left 
          flex 
          justify-between 
          items-center
        "
      >
        {displayLabel}
        <span className="ml-2 transition-transform duration-200">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>
      
      {/* Opciones del Dropdown */}
      {isOpen && (
        <ul 
          className="
            absolute 
            z-10 
            w-full 
            mt-1 
            rounded-lg 
            bg-gray-600 
            shadow-xl 
            overflow-hidden 
            max-h-60 
            overflow-y-auto
          "
        >
          {options.map((option) => (
            <li 
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              onMouseEnter={playClickSound} 
              // 🚀 CLASES FINALES: SOLO HOVER
              className={`
                p-3 
                cursor-pointer 
                transition-colors 
                duration-150
                // ✅ Eliminamos el resaltado basado en 'value'.
                // Solo usamos el resaltado al pasar el ratón:
                hover:bg-teal-500
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}