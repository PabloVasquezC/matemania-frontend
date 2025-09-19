import { useUserStore } from "store/useUserStore";

function Profilepage() {
  const user = useUserStore((state) => state.user);

    // gamesPlayed: 42,
    // wins: 25,
    // rank: 12,
    // bestEquation: "7 + 5 * 3 = 22",
  // };

  // const winRate = user.gamesPlayed > 0 ? ((user.wins / user.gamesPlayed) * 100).toFixed(1) : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-6 font-sans">
      <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-gray-700/50 transform transition-all duration-300 hover:scale-[1.01]">
        
        {/* Sección de perfil */}
        <div className="flex flex-col items-center mb-8">
          <img 
            src={useUserStore.getState().user.avatar} 
            alt="Avatar del usuario" 
            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg mb-4 transform transition-transform duration-300 hover:scale-110"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">{user.username}</h1>
          <p className="text-gray-400 mt-1">Rango: <span className="text-indigo-400 font-bold">{user.rank}</span></p>
        </div>

        {/* Sección de estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-700">
          <div className="flex flex-col items-center p-4 bg-gray-700/30 rounded-lg shadow-md">
            <span className="text-4xl font-extrabold text-indigo-400">{user.gamesPlayed}</span>
            <p className="text-gray-400 mt-1">Partidas Jugadas</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-700/30 rounded-lg shadow-md">
            <span className="text-4xl font-extrabold text-indigo-400">{user.wins}</span>
            <p className="text-gray-400 mt-1">Victorias</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-700/30 rounded-lg shadow-md">
            {/* <span className="text-4xl font-extrabold text-indigo-400">{winRate}%</span> */}
            <p className="text-gray-400 mt-1">Tasa de Victoria</p>
          </div>
        </div>

        {/* Sección de mejor jugada */}
        <div className="mt-8 pt-6 border-t border-gray-700">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Mejor Jugada</h2>
            <div className="p-4 bg-gray-700/50 rounded-lg shadow-inner border border-gray-600">
                <p className="text-gray-300 text-lg md:text-xl font-mono">
                    {user.bestEquation}
                </p>
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default Profilepage;
