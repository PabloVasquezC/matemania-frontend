import { Link } from "react-router-dom";
import logo from "@assets/logo.png";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
      <img
        src={logo}
        alt="Logo"
        className="w-40 h-40 mb-6 animate-fadeIn"
      />

      <header className="mb-10 text-center animate-fadeIn">
        <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 animate-pulse">
          404
        </h1>
        <p className="text-lg md:text-xl text-gray-400">
          ¡Oops! La página que buscas no existe o fue movida.
        </p>
      </header>

      <main
        className="
          w-full 
          max-w-lg 
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
          <h2
            className="
              text-2xl 
              md:text-3xl 
              font-bold 
              text-red-400 
              mb-4 
              animate-slideIn
            "
          >
            Página no encontrada
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed animate-slideIn">
            Puede que la dirección esté mal escrita o que la página ya no esté
            disponible.  
          </p>
        </section>

        <Link
          to="/"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Volver al inicio
        </Link>
      </main>
    </div>
  );
}
