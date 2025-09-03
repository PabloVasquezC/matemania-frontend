import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Define la interfaz para los datos de los jugadores en el ranking
interface IPlayerRank {
  rank: number;
  username: string;
  score: number;
}

// Datos de ejemplo para simular un ranking
const mockRankingData: IPlayerRank[] = [
  { rank: 1, username: "Player_1", score: 1250 },
  { rank: 2, username: "MathWhiz", score: 1120 },
  { rank: 3, username: "EcuacionMaster", score: 980 },
  { rank: 4, username: "Pi_3.14", score: 850 },
  { rank: 5, username: "AlphaGamer", score: 760 },
  { rank: 6, username: "LogicKing", score: 710 },
  { rank: 7, username: "SolverX", score: 630 },
  { rank: 8, username: "GigaMind", score: 590 },
];

export default function RankingPage() {
  const [ranking, setRanking] = useState<IPlayerRank[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Aquí es donde harías la llamada a tu API para obtener el ranking real
    // Por ahora, usamos los datos de ejemplo
    const fetchRanking = async () => {
      // Simula una llamada a la API con un pequeño retraso
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRanking(mockRankingData);
      setIsLoading(false);
    };

    fetchRanking();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
      <header className="mb-10 text-center animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Clasificación
        </h1>
        <p className="text-lg md:text-xl text-gray-400">
          Los maestros de los números se elevan. ¿Estás entre ellos?
        </p>
      </header>

      <main className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center animate-slideIn">
        <section>
					
          {isLoading ? (
            <div className="text-teal-400 text-xl">Cargando ranking...</div>
          ) : (
            <div className="space-y-4">
              {ranking.map((player) => (
                <div
                  key={player.rank}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-teal-300 min-w-[30px]">{player.rank}</span>
                    <span className="text-lg font-semibold text-white">{player.username}</span>
                  </div>
                  <span className="text-xl font-bold text-blue-400">{player.score} pts</span>
                </div>
              ))}
            </div>
          )}
        </section>
        
        <Link 
          to="/home" 
          className="mt-8 inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Volver a Inicio
        </Link>
      </main>
      
      {/* Definiciones de animaciones de Tailwind CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out; }
        .animate-slideIn { animation: slideIn 1s ease-out; }
      `}</style>
    </div>
  );
}