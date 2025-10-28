import { type DragEndEvent } from "@dnd-kit/core";
// Nota: Se eliminan importaciones innecesarias para este archivo
import type { ITile } from "types/ITile";

// --- CONFIGURACIÓN DEL JUEGO ---
const CENTER_SQUARE_ID = 'square-5-5'; // Casilla central para un tablero 11x11

// --- INTERFACES (Correctas) ---
interface HandleDragEndProps {
  tileLocations: Record<string, string>;
  setTiles: React.Dispatch<React.SetStateAction<ITile[]>>;
  setTileLocations: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  tiles: ITile[];
  updateScore: (points: number) => void;
  setCurrentPlayTiles: React.Dispatch<React.SetStateAction<string[]>>; 
}

// --- FUNCIÓN PRINCIPAL ---
const createHandleDragEnd = ({
  tileLocations,
  setTiles, // Necesario si permitieras reponer fichas al droppear, pero no lo haremos aquí.
  setTileLocations,
  tiles,
  updateScore, // No usado aquí
  setCurrentPlayTiles
}: HandleDragEndProps) => {

  return (event: DragEndEvent) => {
    const { over, active } = event;

    if (!over) return;

    const activeTileId = active.id.toString();
    const droppableId = over.id.toString();

    // 1. Identificar el tipo de movimiento
    const isMovedFromRackToBoard =
      tileLocations[activeTileId] === "pool" && droppableId.startsWith("square");

    // Lógica para movimientos internos (Rack-a-Rack, Board-a-Board, Board-a-Rack)
    if (!isMovedFromRackToBoard) {
        setTileLocations((prev) => ({
            ...prev,
            [activeTileId]: droppableId,
        }));
        // Si la ficha se quita del tablero, la removemos de la jugada actual
        if (!droppableId.startsWith('square')) {
             setCurrentPlayTiles(prev => prev.filter(id => id !== activeTileId));
        }
        return; 
    }
    
    // --- REGLA DEL PRIMER TURNO (Check 1: Centro) ---
    
    const isBoardEmpty = Object.values(tileLocations).every(
        location => !location.startsWith('square-')
    );

    if (isBoardEmpty) {
        if (droppableId !== CENTER_SQUARE_ID) {
            console.log("❌ Primer turno: ¡Debes comenzar en la casilla central (5-5)!");
            return; // Bloquea el drop
        }
    } 
    
    // -------------------------------------------------------------------------
    // ✅ PASÓ LOS CHEQUEOS DE MOVIMIENTO. ACEPTAR EL DROP Y REGISTRAR LA FICHA.
    // -------------------------------------------------------------------------
    
    // 1. ACEPTAR EL DROP (Actualizar las ubicaciones temporalmente)
    const nextTileLocations = {
        ...tileLocations,
        [activeTileId]: droppableId, 
    };
    setTileLocations(nextTileLocations);
    
    // 2. REGISTRAR ESTA FICHA COMO PARTE DE LA JUGADA ACTUAL
    setCurrentPlayTiles(prev => {
        if (!prev.includes(activeTileId)) {
            console.log(`Ficha ${activeTileId} colocada temporalmente en ${droppableId}.`);
            return [...prev, activeTileId];
        }
        return prev;
    });
    
    // 🛑 IMPORTANTE: SE ELIMINÓ TODO EL CÓDIGO DE VALIDACIÓN Y REVERSIÓN.
    // La validación ahora ocurre en el botón 'Terminar Turno'.
  };
};

export default createHandleDragEnd;