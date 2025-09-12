import axios from "axios";
import { API_URL } from "../constants/constants";

// Esta es la función corregida para obtener el perfil.
export const getMyProfile = async () => {
	console.log("Token en getMyProfile:", localStorage.getItem('access_token')); // Verifica si el token está presente
  try {
    // 1. Obtener el token del almacenamiento local
    const authToken = localStorage.getItem('access_token');
    
    // Si no hay token, lanza un error (el usuario no está autenticado)
    if (!authToken) {
      throw new Error("No hay token de autenticación. Por favor, inicia sesión.");
    }

    // 2. Incluir el token en el encabezado de la solicitud
    const response = await axios.get(
      `${API_URL}profile/`, {
        headers: {
          // El formato correcto es 'Authorization: Token <el_token>' para DRF
          Authorization: `Token ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // Manejo de errores específicos, como un token inválido
      if (err.response.status === 401) {
        throw new Error("Token de autenticación inválido o expirado. Inicia sesión nuevamente.");
      }
      throw new Error(err.response.data.detail || "Error al obtener el perfil.");
    } else {
      throw new Error("Error de conexión. Inténtalo de nuevo.");
    }
  }
};
