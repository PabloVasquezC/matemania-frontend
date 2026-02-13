import axios from 'axios';
import type { ITile } from 'types/ITile';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const gameService = {
    validatePlay: async (tiles: ITile[]) => {
        try {
            // Transform custom ITile to the format expected by backend if needed
            // The backend expects: { id, value, points }
            const payload = {
                tiles: tiles.map(tile => ({
                    id: tile.id,
                    value: tile.value,
                    points: tile.points
                }))
            };

            const response = await axios.post(`${API_URL}/validate-play/`, payload);
            return response.data;
        } catch (error) {
            console.error("Error validating play:", error);
            throw error;
        }
    }
};
