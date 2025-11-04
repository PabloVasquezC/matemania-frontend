import axios from "axios";
import { API_URL } from "../constants/constants";
import type { SignUpData } from "../types/ISignUpData";
import type { ILoginData } from "../types/ILoginData";
import type { IAuthResponse } from "../types/IAuthResponse";
import type { IUser } from "types/IUser";
// Definimos los tipos de datos para las funciones


/**
 * Función que maneja el inicio de sesión del usuario.
 * @param data Los datos de inicio de sesión (usuario y contraseña).
 * @returns Una promesa con la respuesta de la API.
 */
export const login: (data: ILoginData) => Promise<IAuthResponse> = async (data: ILoginData): Promise<IAuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}token/`, {
      username: data.username,
      password: data.password,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.detail || "Error de inicio de sesión. Verifica tus credenciales.");
    } else {
      throw new Error("Error de conexión. Inténtalo de nuevo.");
    }
  }
};

/**
 * Función que maneja el registro de un nuevo usuario.
 * @param data Los datos de registro (usuario, email y contraseñas).
 * @returns Una promesa con la respuesta de la API.
 */
export const signup = async (data: SignUpData): Promise<IAuthResponse> => {
  try {
    const SIGNUP_URL = `${API_URL}/api/auth/registration/register/`;
    
    // 🚨 DEBUGGING CRUCIAL: Comprobar si algún campo es null/undefined/cadena vacía.
    if (!data.username || !data.email || !data.password || !data.confirmPassword) {
      console.error("DEBUG: Datos de registro incompletos:", data);
      throw new Error("Por favor, rellena todos los campos requeridos para el registro.");
    }

    const payload = {
        username: data.username,
        password: data.password,
        email: data.email,
        // dj-rest-auth requiere 'password2' para la validación de la confirmación.
        password2: data.confirmPassword, 
    };
    
    // Muestra el JSON exacto que se enviará al servidor
    console.log("DEBUG: Payload de registro enviado a Django:", payload);

    const response = await axios.post(SIGNUP_URL, payload);

    // dj-rest-auth puede devolver el JWT si lo configuraste para ello, o solo un mensaje de éxito.
    return response.data; 
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.error("Error de respuesta del servidor:", err.response.data);

      let errorMessage = "Error de registro desconocido.";
      const errorData = err.response.data;

      // Intenta extraer el error de los campos más comunes
      if (errorData.email) {
        errorMessage = `Email: ${errorData.email[0]}`;
      } else if (errorData.username) {
        errorMessage = `Usuario: ${errorData.username[0]}`;
      } else if (errorData.password || errorData.password2) {
        // Mejorar la lectura del error de contraseña
        errorMessage = `Contraseña: ${errorData.password?.[0] || errorData.password2?.[0]}`;
      } else if (errorData.non_field_errors) {
        errorMessage = `Error: ${errorData.non_field_errors[0]}`;
      } else if (errorData.detail) {
        errorMessage = errorData.detail;
      } else {
        // En caso de estructura de error muy anidada o inesperada
        errorMessage = JSON.stringify(errorData);
      }
      
      throw new Error(`Error en el registro: ${errorMessage}`);
    } else {
      console.error("Error de conexión:", err);
      throw new Error("Error de conexión. Inténtalo de nuevo más tarde.");
    }
  }

};

export const getProfile = async (): Promise<IUser> => {
  // Obtén el token de acceso del localStorage
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("No se encontró el token de acceso.");
  }

  try {
    const response = await axios.get(`${API_URL}profile/`, {
      headers: {
        // Incluye el token de acceso en el encabezado de autorización
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.detail || "Error al cargar el perfil.");
    } else {
      throw new Error("Error de conexión. Inténtalo de nuevo.");
    }
  }
};

export const logout = async () => {
  const refresh = localStorage.getItem("refresh_token");

  if (!refresh) {
    return { message: "No hay token para invalidar" };
  }

  // Si estás usando dj-rest-auth, la ruta de logout DEBERÍA ser:
  // `${API_URL}auth/logout/`
  const response = await fetch(`${API_URL}logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    throw new Error("Error cerrando sesión");
  }

  return await response.json();
};