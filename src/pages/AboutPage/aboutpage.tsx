import { Link } from 'react-router-dom';
import logo from "@assets/logo.png";

function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-6 font-sans">
      <main className="w-full max-w-3xl bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-gray-700/50 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-primary/30">
        
        {/* Contenedor del logo y título */}
        <div className="flex flex-col items-center mb-6">
          {/* Logo SVG */}
          <img src={logo} alt="CogniTiles Logo" className="h-80 w-auto text-indigo-400 animate-pulse-slow" />

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-wide leading-tight">
            Sobre <span className="text-indigo-400">Matemanía</span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6 font-light">
          Matemanía nació de la idea de fusionar el clásico juego de palabras con el fascinante mundo de los números. Es un desafío para la mente que combina estrategia, lógica y un poco de suerte.
        </p>
        
        <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8">
          Nuestro objetivo es ofrecer una experiencia de juego única, divertida y educativa. Creemos que la matemática, al igual que las letras, puede ser un vehículo para la creatividad y el pensamiento crítico.
        </p>

        <p className="text-base md:text-lg text-gray-400 leading-relaxed">
          ¡Gracias por unirte a nuestra comunidad y esperamos que disfrutes de cada partida tanto como nosotros disfrutamos creándola!
        </p>

        <div className="mt-8">
          <Link 
            to="/game"
            className="inline-block px-6 py-3 text-lg font-bold text-white bg-indigo-600 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-indigo-700"
          >
            ¡Empezar a jugar!
          </Link>
        </div>

      </main>
    </div>
  );
}

export default AboutPage;
