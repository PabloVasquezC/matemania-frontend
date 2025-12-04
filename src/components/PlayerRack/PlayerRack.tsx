import type { IUserState } from "types/IUserState";
import type { IPlayer } from "../../types/IPlayer";
import type { ReactNode } from "react";
import { useUserStore } from "store/useUserStore";
import { UserIcon } from "@heroicons/react/24/outline";

function PlayerRack({ children }: { player: IPlayer; children?: ReactNode }) {
  const user = useUserStore((state: IUserState) => state.user);

  return (
    <div
      className="
      bg-gray-800/50
      rounded-xl 
      shadow-2xl 
      border border-gray-700
      p-5
      flex 
      flex-col 
      items-center 
      text-center 
      space-y-4
      mt-20
      "
      
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

      <div className="w-full flex-grow">
        {children}
        </div>
    </div>
  );
}

export default PlayerRack;
