import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@assets/logo.png";
import playClickSound from "@utils/sounds/play_sound";
// Importa el nuevo archivo TSX
import CustomSelect from "./CustomSelect"; 

// ⭐️ Interfaz de ayuda para tipar las opciones
interface Option {
  value: string;
  label: string;
}

// ⭐️ TIPADO de las opciones
const modeOptions: Option[] = [
  { value: "matematico", label: "matemático 🎓" },
  { value: "cientifico", label: "científico 🧪" },
  { value: "visual", label: "visual (Color) 👁️" },
  { value: "sonoro", label: "sonoro (BETA) 🎵" },
];

const difficultyOptions: Option[] = [
  { value: "easy", label: "Fácil 🎉" },
  { value: "medium", label: "Medio 🎯" },
  { value: "hard", label: "Difícil 🚀" },
];

export default function GameMenu() {
  // ⭐️ Tipado explícito de useState no es estrictamente necesario aquí, 
  // pero lo hacemos por claridad
  const [userName, setUserName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [mode, setMode] = useState<string>("matematico"); 
  const navigate = useNavigate();

  // ... (useEffect y handleStartGame permanecen iguales)

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    }
    const storedDifficulty = localStorage.getItem("difficulty");
    if (storedDifficulty) {
      setDifficulty(storedDifficulty);
    }
  }, []);

  const handleStartGame = () => {
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("mode", mode);
    navigate("/game");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
      <img src={logo} alt="Logo" className="w-28 h-28 mb-4 animate-fadeIn" />

      <header className="mb-10 text-center animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse">
          Matemanía
        </h1>
        <p className="text-lg md:text-xl text-gray-400">
          {userName ? (
            <>¡Hola, <span className="font-bold text-teal-300">{userName}</span>! Configura tu partida.</>
          ) : (
            <>Elige tus opciones antes de comenzar el desafío.</>
          )}
        </p>
      </header>

      <main
        className="
          w-full 
          max-w-2xl 
          bg-gray-800 
          rounded-2xl 
          shadow-2xl 
          p-8 md:p-12 
          text-center 
          transform 
          transition-all 
          duration-500 
          hover:scale-[1.01]
        "
      >
        <section className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-6 animate-slideIn">
            Configuración de Juego
          </h2>

          {/* USAMOS EL COMPONENTE CUSTOM SELECT */}
          <CustomSelect
            label="Tipo de juego"
            value={mode}
            onChange={setMode}
            options={modeOptions}
          />

          {/* USAMOS EL COMPONENTE CUSTOM SELECT */}
          <CustomSelect
            label="Nivel de dificultad"
            value={difficulty}
            onChange={setDifficulty}
            options={difficultyOptions}
          />

        </section>

        <button
          onClick={() => { playClickSound(); handleStartGame(); }}
          className="
            bg-gradient-to-r 
            from-blue-500 
            to-indigo-600 
            hover:from-blue-600 
            hover:to-indigo-700 
            text-white 
            font-bold 
            py-3 
            px-8 
            rounded-lg 
            transition 
            duration-300 
            ease-in-out 
            transform 
            hover:scale-105 
            shadow-md
          "
        >
          ¡Comenzar juego!
        </button>
      </main>
    </div>
  );
}