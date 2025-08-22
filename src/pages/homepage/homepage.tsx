// src/components/homepage/HomePage.js

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4 font-sans">
      
      <header className="mb-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-2">
          Scrabble Matemático
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Donde las letras se convierten en números y el ingenio matemático es tu mejor jugada.
        </p>
      </header>

      <main className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
        <section className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Pon a prueba tu mente
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Bienvenido a una nueva dimensión de Scrabble. En lugar de formar palabras, crearás ecuaciones. 
            Utiliza las fichas numéricas y operadores (+, -, *, /) para construir expresiones matemáticas válidas 
            y obtener la puntuación más alta. Piensa estratégicamente, bloquea a tu oponente y 
            demuestra que eres el maestro de los números.
          </p>
        </section>
        
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
          ¡Jugar ahora!
        </button>
      </main>

      
    </div>
  );
}