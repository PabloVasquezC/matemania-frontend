import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@assets/logo.png";

export default function GameMenu() {
  const [userName, setUserName] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [mode, setMode] = useState("solo");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  const handleStartGame = () => {
    // Guardar configuraciones si es necesario
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

          {/* Nivel de dificultad */}
          <div className="mb-6 text-left">
            <label className="block mb-2 font-semibold text-gray-300">
              Nivel de dificultad
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="easy">Fácil</option>
              <option value="medium">Medio</option>
              <option value="hard">Difícil</option>
            </select>
          </div>

          {/* Modo de juego */}
          <div className="mb-6 text-left">
            <label className="block mb-2 font-semibold text-gray-300">
              Modo de juego
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="solo">Un jugador</option>
              <option value="multiplayer">Multijugador</option>
            </select>
          </div>
        </section>

        <button
          onClick={handleStartGame}
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
