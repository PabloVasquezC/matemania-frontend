// src/pages/AboutPage.js
import React from 'react';

function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-6">
      <main className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="mb-8">
          {/* Un ícono o imagen para la temática matemática */}
          <span className="text-6xl text-blue-600">
            &infin;
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
          Sobre Scrabble Matemático
        </h1>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
          Scrabble Matemático nació de la idea de fusionar el clásico juego de palabras con el fascinante mundo de los números. Es un desafío para la mente que combina estrategia, lógica y un poco de suerte.
        </p>
        
        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
          Nuestro objetivo es ofrecer una experiencia de juego única, divertida y educativa. Creemos que la matemática, al igual que las letras, puede ser un vehículo para la creatividad y el pensamiento crítico.
        </p>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          ¡Gracias por unirte a nuestra comunidad y esperamos que disfrutes de cada partida tanto como nosotros disfrutamos creándola!
        </p>

      </main>
    </div>
  );
}

export default AboutPage;