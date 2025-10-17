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
    const response = await axios.post(`${API_URL}signup/`, {
      username: data.username,
      password: data.password,
      email: data.email,
      avatar: data.avatar,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const serverError = err.response.data.detail || Object.values(err.response.data)[0];
      console.log("Estructura de error:", err.response.data);
      throw new Error(`Error en el registro: ${serverError}`);
      //eso me esta devolviendo un array y no se por que
      // Podrías intentar hacer un console.log para ver la estructura de error
    } else {
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




