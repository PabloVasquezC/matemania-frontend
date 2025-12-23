import axios from "axios";
import { API_URL } from "../constants/constants";
import type { SignUpData } from "../types/ISignUpData";
import type { ILoginData } from "../types/ILoginData";
import type { IAuthResponse } from "../types/IAuthResponse";
import type { IUser } from "types/IUser";
import { enviarProcesoAn8n } from "./n8n";
// Definimos los tipos de datos para las funciones


/**
 * Función que genera la URL del endpoint de Django para iniciar el flujo de autenticación de Google.
 * Esta URL es a la que debe redirigir el botón "Login con Google" en el Frontend.
 * @returns La URL completa del endpoint de Django.
 */
export const getGoogleLoginUrl = (): string => {
  // Coincide con el path definido en cognitiles/urls.py: 'auth/google/login/'
  return `${API_URL}/auth/google/login/`; 
};


/**
 * Función que maneja el inicio de sesión del usuario.
 * @param data Los datos de inicio de sesión (usuario y contraseña).
 * @returns Una promesa con la respuesta de la API.
 */
export const login: (data: ILoginData) => Promise<IAuthResponse> = async (data: ILoginData): Promise<IAuthResponse> => {
  try {
    // La ruta para obtener el token es /token/ (JWT simple)
    const response = await axios.post(`${API_URL}/token/`, {
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
    // La ruta de registro en dj-rest-auth es /auth/registration/
    const SIGNUP_URL = `${API_URL}/auth/registration/`;
    
    if (!data.username || !data.email || !data.password || !data.confirmPassword) {
      console.error("DEBUG: Datos de registro incompletos:", data);
      throw new Error("Por favor, rellena todos los campos requeridos para el registro.");
    }

    // Payload con 'password1' y 'password2' (Esto ya estaba correcto)
    const payload = {
        username: data.username,
        email: data.email,
        password1: data.password,
        password2: data.confirmPassword, 
        avatar: data.avatar // <--- ¡ESTO FALTABA!
    };
    
    console.log("DEBUG: Payload de registro enviado a Django:", payload);

    const response = await axios.post(SIGNUP_URL, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    return response.data; 
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.error("Error de respuesta del servidor:", err.response.data);
      let errorMessage = "Error de registro desconocido.";
      const errorData = err.response.data;
      if (errorData.email) {
        errorMessage = `Email: ${errorData.email[0]}`;
      } else if (errorData.username) {
        errorMessage = `Usuario: ${errorData.username[0]}`;
      } else if (errorData.password1 || errorData.password2) {
        errorMessage = `Contraseña: ${errorData.password1?.[0] || errorData.password2?.[0]}`;
      } else if (errorData.non_field_errors) {
        errorMessage = `Error: ${errorData.non_field_errors[0]}`;
      } else if (errorData.detail) {
        errorMessage = errorData.detail;
      } else {
        errorMessage = JSON.stringify(errorData);
      }
      throw new Error(`Error en el registro: ${errorMessage}`);
    } else {
      console.error("Error de conexión:", err);
      throw new Error("Error de conexión. Inténtalo de nuevo más tarde.");
    }
  }

};

/**
 * Función que obtiene el perfil del usuario autenticado.
 * @returns Una promesa con los datos del usuario.
 */
export const getProfile = async (): Promise<IUser> => {
  enviarProcesoAn8n();
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("No se encontró el token de acceso.");
  }

  try {
    // Ruta de ejemplo para obtener el perfil. Asegúrate que esta ruta exista en tu urls.py
    const response = await axios.get(`${API_URL}/profile/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // Si el token expira, el backend dará 401 Unauthorized
      if (err.response.status === 401) {
          // Aquí podrías implementar la lógica de refresh token
          throw new Error("Sesión expirada. Por favor, inicia sesión de nuevo.");
      }
      throw new Error(err.response.data.detail || "Error al cargar el perfil.");
    } else {
      throw new Error("Error de conexión. Inténtalo de nuevo.");
    }
  }
};

/**
 * Función que maneja el cierre de sesión, invalidando el token de refresco en el backend.
 * También limpia los tokens del almacenamiento local.
 */
export const logout = async (): Promise<{ message: string }> => {
  const refreshToken = localStorage.getItem("refresh_token");
  const accessToken = localStorage.getItem("access_token");

  // Limpieza inicial: Se asume que el token de refresh es lo único que hay que invalidar
  if (refreshToken) {
    try {
      // Endpoint de logout de dj-rest-auth para invalidar el Refresh Token (espera POST)
      const LOGOUT_URL = `${API_URL}/auth/logout/`; 

      await axios.post(LOGOUT_URL, { 
        refresh_token: refreshToken 
      }, {
        headers: {
          "Content-Type": "application/json",
          // Se recomienda enviar el Access Token también, aunque a veces no es estrictamente necesario 
          // si el backend solo valida el refresh_token. Es una buena práctica.
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });
      
      // Si el POST fue exitoso, el token fue invalidado en el backend
      console.log("Logout exitoso en el backend (token invalidado).");

    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            // Un error 400 o 401 aquí generalmente significa que el token ya estaba invalidado o expiró.
            // Si el token ya está muerto, podemos simplemente proceder a limpiar el frontend.
            console.warn("Error al invalidar token de refresco (posiblemente ya expirado):", err.response.data);
        } else {
            // Error de conexión. Podríamos decidir no limpiar los tokens si falló la conexión, 
            // pero para cerrar la sesión local, es mejor limpiar de todas formas.
            console.error("Error de conexión durante el logout:", err);
        }
        // IMPORTANTE: Continuar con la limpieza de tokens en el frontend
    }
  } else {
      console.log("No se encontró Refresh Token para invalidar en el backend.");
  }

  // PASO FINAL: Limpiar los tokens en el frontend, independientemente del éxito del POST.
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  return { message: "Sesión cerrada correctamente" };
};