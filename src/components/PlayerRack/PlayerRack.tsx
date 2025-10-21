import type { IUserState } from "types/IUserState";
import type { IPlayer } from "../../types/IPlayer";
import type { ReactNode } from "react";
import { useUserStore } from "store/useUserStore";
import {
  UserIcon,
} from "@heroicons/react/24/outline";

function PlayerRack({
  player,
  children,
}: {
  player: IPlayer;
  children?: ReactNode;
}) {
  const user = useUserStore((state: IUserState) => state.user);

  return (
    <div
      className="
      max-w-96
      h-170
      bg-gray-800/50
      rounded-xl 
      shadow-2xl 
      border border-gray-700
      p-5
      flex 
      flex-col 
      items-center 
      text-center 
      space-y-4"
    >
      <div className="flex flex-col items-center">
        {user && user.avatar ? (
          <img
            className="w-20 h-20 
            rounded-full 
            border-4 
            border-purple-500 
            shadow-lg 
            -mt-10 
            bg-gray-900"
            src={user.avatar}
            alt="User Avatar"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-white" />
          </div>
        )}
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-200 mt-2">{}</h2>
      </div>

      <div className="w-full flex-grow">{children}</div>

      <div className="w-full">
        <h3 className="text-3xl font-extrabold text-white">
          Score: <span className="text-purple-400">{player.score}</span>
        </h3>
      </div>

      <div className="w-full flex justify-center space-x-3 mt-4">
        {/* Botón de "Play": Azul Marino */}
        <button
          className="flex-1 font-medium py-2 px-4 rounded-full transition-all duration-200
                           text-white 
                           bg-gradient-to-r from-blue-900 to-slate-900
                           hover:from-blue-800 hover:to-slate-800
                           active:shadow-inner active:shadow-gray-950
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Play
        </button>
        {/* Botón de "Pass": Gris Pizarra */}
        <button
          className="flex-1 font-medium py-2 px-4 rounded-full transition-all duration-200
                           text-white
                           bg-gradient-to-r from-slate-600 to-gray-700
                           hover:from-slate-700 hover:to-gray-800
                           active:shadow-inner active:shadow-gray-950
                           focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Pass
        </button>
        {/* Botón de "Sort": Tono Dorado/Bronce */}
        <button
          className="flex-1 font-medium py-2 px-4 rounded-full transition-all duration-200
                           text-black
                           bg-gradient-to-r from-amber-400 to-yellow-500
                           hover:from-amber-300 hover:to-yellow-400
                           active:shadow-inner active:shadow-gray-950
                           focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          Sort
        </button>
      </div>

      <div className="w-full text-center mt-4">
        {player.isActive ? (
          <p className="text-yellow-400 font-semibold text-lg animate-pulse">
            Your turn!
          </p>
        ) : (
          <p className="text-gray-400 text-sm">Waiting...</p>
        )}
      </div>
    </div>
  );
}

export default PlayerRack;
