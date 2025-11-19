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

// ⭐️ NUEVO: Opciones de tiempo en minutos (almacenamos el valor en segundos)
const timeOptions: Option[] = [
  { value: "60", label: "1 minuto (60s)" },
  { value: "180", label: "3 minutos (180s)" },
  { value: "300", label: "5 minutos (300s)" },
];


export default function GameMenu() {
  const [userName, setUserName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [mode, setMode] = useState<string>("matematico"); 
  // ⭐️ NUEVO: Estado para el límite de tiempo (por defecto 3 minutos = 180 segundos)
  const [timeLimit, setTimeLimit] = useState<string>("180"); 
  const navigate = useNavigate();

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
    // ⭐️ NUEVO: Cargar límite de tiempo
    const storedTimeLimit = localStorage.getItem("timeLimit");
    if (storedTimeLimit) {
      setTimeLimit(storedTimeLimit);
    }
  }, []);

  const handleStartGame = () => {
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("mode", mode);
    // ⭐️ NUEVO: Guardar límite de tiempo
    localStorage.setItem("timeLimit", timeLimit);
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
        <section className="mb-6 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-6 animate-slideIn">
            Configuración de Juego
          </h2>

          {/* USAMOS EL COMPONENTE CUSTOM SELECT - Tipo de juego */}
          <CustomSelect
            label="Tipo de juego"
            value={mode}
            onChange={setMode}
            options={modeOptions}
          />

          {/* USAMOS EL COMPONENTE CUSTOM SELECT - Dificultad */}
          <CustomSelect
            label="Nivel de dificultad"
            value={difficulty}
            onChange={setDifficulty}
            options={difficultyOptions}
          />
          
          {/* ⭐️ NUEVO: USAMOS EL COMPONENTE CUSTOM SELECT - Límite de tiempo */}
          <CustomSelect
            label="Límite de tiempo"
            value={timeLimit}
            // Asegúrate de que el valor sea un string
            onChange={setTimeLimit} 
            options={timeOptions}
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