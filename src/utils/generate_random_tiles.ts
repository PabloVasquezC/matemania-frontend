// utils/generate_random_tiles.ts


// ⭐️ ASUME que las constantes están en esta ruta relativa
import { TILES } from "@constants/constants";
import type { ITile } from "types/ITile";
 

// Definimos los modos válidos para tipado
type GameMode = keyof typeof TILES; 

/**
 * Genera un número especificado de fichas aleatorias para el rack inicial.
 * @param count El número de fichas a generar.
 * @param mode El modo de juego seleccionado (matematico, sonoro, etc.).
 * @returns Un array de fichas (ITile).
 */
const generateRandomTiles = (
  count: number, 
  mode: string = "matematico" 
): ITile[] => {
  // Aseguramos que el modo sea una clave válida de TILES o usamos 'matematico'
  const validMode = mode in TILES ? mode as GameMode : "matematico";
  
  // 1. Seleccionar el conjunto de fichas base para el modo
  const availableTiles = TILES[validMode];

  const randomTiles: ITile[] = [];

  for (let i = 0; i < count; i++) {
    // 2. Elegir una ficha aleatoria de la colección del modo
    const randomIndex = Math.floor(Math.random() * availableTiles.length);
    const selectedTile = availableTiles[randomIndex];
    
    // Clonar la ficha y generar un ID único
    const newTile: ITile = {
        ...selectedTile,
        // Usamos una combinación de valor, tiempo y un número aleatorio para un ID único
        id: `${selectedTile.value}-${Date.now()}-${i}-${Math.random()}`, 
    };
    
    randomTiles.push(newTile);
  }

  return randomTiles;
};

export default generateRandomTiles;