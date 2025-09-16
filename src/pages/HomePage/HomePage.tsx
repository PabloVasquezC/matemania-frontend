import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/logo.png";
import "./home-page.css";

export default function HomePage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Lee el nombre de usuario del localStorage al cargar el componente
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
      <img src={logo} alt="Logo" className="w-100 h-100 mb-4 animate-fadeIn" />
      <header className="mb-10 text-center animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse">
          CogniTiles
        </h1>
        {userName ? (
          <p className="text-lg md:text-xl text-gray-400">
            <span className="font-bold text-teal-300">¡Hola, {userName}!</span> Bienvenido de nuevo.
          </p>
        ) : (
          <p className="text-lg md:text-xl text-gray-400">
            Donde las letras se convierten en números y el ingenio matemático es tu mejor jugada.
          </p>
        )}
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
          <h2 className="
            text-3xl 
            md:text-4xl 
            font-bold 
            text-teal-400 
            mb-4 
            animate-slideIn">
            Pon a prueba tu mente
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed animate-slideIn">
            Bienvenido a una nueva dimensión de Scrabble. En lugar de formar palabras, crearás ecuaciones. 
            Utiliza las fichas numéricas y operadores (+, -, *, /) para construir expresiones matemáticas válidas 
            y obtener la puntuación más alta. Piensa estratégicamente, bloquea a tu oponente y 
            demuestra que eres el maestro de los números.
          </p>
        </section>

        <Link to="/game" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
          ¡Jugar ahora!
        </Link>
      </main>

    </div>
  );
}