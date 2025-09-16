import axios from "axios";
import { API_URL } from "../constants/constants";
import type { SignUpData } from "../types/ISignUpData";
import type { ILoginData } from "../types/ILoginData";
import type { IAuthResponse } from "../types/IAuthResponse";
// Definimos los tipos de datos para las funciones


/**
 * Función que maneja el inicio de sesión del usuario.
 * @param data Los datos de inicio de sesión (usuario y contraseña).
 * @returns Una promesa con la respuesta de la API.
 */
export const login = async (data: ILoginData): Promise<IAuthResponse> => {
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
      throw new Error(`Error en el registro: ${serverError}`);
    } else {
      throw new Error("Error de conexión. Inténtalo de nuevo más tarde.");
    }
  }
};
