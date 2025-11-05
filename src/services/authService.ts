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
    // 🚨 CORREGIDO: Añadido '/' después de API_URL
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
    // 🚨 CORREGIDO: Añadido '/' después de API_URL
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

export const getProfile = async (): Promise<IUser> => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("No se encontró el token de acceso.");
  }

  try {
    // 🚨 CORREGIDO: Añadido '/' después de API_URL
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

export const logout = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) {
    return { message: "No hay token para invalidar" };
  }

  // 🚨 CORREGIDO: Añadido '/' después de API_URL
  // Y 🚨 NOTA: La ruta de logout de dj-rest-auth es /auth/logout/
  const response = await fetch(`${API_URL}/auth/logout/`, { // <- URL corregida
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ refresh_token: refresh }), // dj-rest-auth espera 'refresh_token'
  });

  if (!response.ok) {
    throw new Error("Error cerrando sesión");
  }

  return await response.json();
};
