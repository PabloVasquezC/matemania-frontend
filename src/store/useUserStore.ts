import type { IUserState } from "../types/IUserState";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export const useUserStore = create<IUserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);