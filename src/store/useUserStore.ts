import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null, // El estado inicial ahora es null, ya que el middleware lo cargará
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // Nombre de la clave en localStorage
      getStorage: () => localStorage, // (Opcional) Especifica el almacenamiento a usar
    }
  )
);