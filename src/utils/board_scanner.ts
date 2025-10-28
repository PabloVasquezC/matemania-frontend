// utils/board_scanner.ts

import type { ITile } from "@constants/constants";

// Función auxiliar para obtener la ubicación (fila y columna) a partir del ID del cuadrado.
const parseSquareId = (squareId: string) => {
    // Ejemplo: "square-5-3" -> [5, 3]
    const parts = squareId.split('-');
    if (parts.length !== 3) return null;
    return { row: Number(parts[1]), col: Number(parts[2]) };
};

/**
 * Escanea el tablero para encontrar secuencias contiguas de fichas 
 * que pasan por la ubicación especificada.
 * @param tiles Array de todas las fichas en el juego.
 * @param tileLocations Mapeo actual de ubicaciones de todas las fichas.
 * @param newTileLocation La ubicación de la ficha que activa el escaneo (e.g., "square-5-3").
 * @returns Un objeto con las secuencias horizontal y vertical (pueden estar vacías).
 */
export const getPlaySequences = (
    tiles: ITile[], 
    tileLocations: Record<string, string>, 
    newTileLocation: string // e.g., "square-5-3"
) => {
    const newLoc = parseSquareId(newTileLocation);
    if (!newLoc) return { horizontal: [], vertical: [] };

    const sequences = {
        horizontal: [] as ITile[],
        vertical: [] as ITile[]
    };
    const MAX_DIMENSION = 11; // 11x11

    // Mapeo inverso para encontrar la ficha por ubicación rápidamente
    const locationToTile = tiles.reduce((acc, tile) => {
        if (tileLocations[tile.id]?.startsWith('square-')) {
            acc[tileLocations[tile.id]] = tile;
        }
        return acc;
    }, {} as Record<string, ITile>);


    // --- 1. Extraer Horizontal ---
    let startCol = newLoc.col;
    // Retrocede para encontrar la primera ficha de la secuencia
    while (startCol >= 0 && locationToTile[`square-${newLoc.row}-${startCol}`]) {
        startCol--; 
    }
    // Avanza para construir la secuencia
    for (let c = startCol + 1; c < MAX_DIMENSION; c++) {
        const currentTile = locationToTile[`square-${newLoc.row}-${c}`];
        if (currentTile) {
            sequences.horizontal.push(currentTile);
        } else {
            break; // Se acabó la secuencia contigua
        }
    }

    // --- 2. Extraer Vertical ---
    let startRow = newLoc.row;
    // Retrocede para encontrar la primera ficha de la secuencia
    while (startRow >= 0 && locationToTile[`square-${startRow}-${newLoc.col}`]) {
        startRow--; 
    }
    // Avanza para construir la secuencia
    for (let r = startRow + 1; r < MAX_DIMENSION; r++) {
        const currentTile = locationToTile[`square-${r}-${newLoc.col}`];
        if (currentTile) {
            sequences.vertical.push(currentTile);
        } else {
            break; // Se acabó la secuencia contigua
        }
    }
    
    // ✅ NO SE APLICA EL FILTRO DE LONGITUD AQUÍ.
    return sequences;
};