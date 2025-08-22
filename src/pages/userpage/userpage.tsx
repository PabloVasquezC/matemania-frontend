// src/pages/Userpage.js
import React from 'react';

function Userpage() {
  const user = {
    username: "JugadorPro123",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d", // A placeholder image
    gamesPlayed: 42,
    wins: 25,
    rank: 12,
    bestEquation: "7 + 5 * 3 = 22", // A sample best score
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
        
        {/* Sección de perfil */}
        <div className="flex flex-col items-center mb-6">
          <img 
            src={user.avatarUrl} 
            alt="Avatar del usuario" 
            className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
          <p className="text-gray-500 mt-1">Nivel: {user.rank}</p>
        </div>

        {/* Sección de estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t pt-6">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-blue-600">{user.gamesPlayed}</span>
            <p className="text-gray-500">Partidas Jugadas</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-blue-600">{user.wins}</span>
            <p className="text-gray-500">Victorias</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-blue-600">{(user.wins / user.gamesPlayed * 100).toFixed(1)}%</span>
            <p className="text-gray-500">Tasa de Victoria</p>
          </div>
        </div>

        {/* Sección de logros o mejor jugada */}
        <div className="mt-8 pt-6 border-t">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Mejor Jugada</h2>
            <p className="text-gray-600 text-lg font-mono p-4 bg-gray-100 rounded-md shadow-inner">
                {user.bestEquation}
            </p>
        </div>
        
      </div>
    </div>
  );
}

export default Userpage;