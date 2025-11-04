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
    // NOTA: Si estás usando dj-rest-auth con JWT, la ruta de login DEBERÍA ser:
    // `${API_URL}auth/login/` 
    // Pero asumiendo que ya configuraste /token/ para el login, la dejo por ahora.
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
    // 🚨 CORRECCIÓN 1: La URL debe ser el endpoint correcto de dj-rest-auth
    const SIGNUP_URL = `${API_URL}auth/registration/register/`; 
    
    // 🚨 CORRECCIÓN 2: dj-rest-auth requiere que la confirmación de la contraseña 
    // se envíe como 'password2' si usa el serializer por defecto.
    const response = await axios.post(SIGNUP_URL, {
      username: data.username,
      password: data.password,
      email: data.email,
      // Se requiere el campo 'password2' para la validación del backend
      password2: data.confirmPassword || data.password, 
      // El avatar lo manejaremos en el front-end después del registro exitoso o en un paso posterior.
      // Si el backend espera un campo 'avatar' al registrar, asegúrate de que esté permitido en el serializer de Django.
    });

    // dj-rest-auth puede devolver el JWT si lo configuraste para ello, o solo un mensaje de éxito.
    return response.data; 
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.log("Error de respuesta del servidor:", err.response.data);

      let errorMessage = "Error de registro desconocido.";
      const errorData = err.response.data;

      // Intenta extraer el error de los campos más comunes
      if (errorData.email) {
        errorMessage = `Email: ${errorData.email[0]}`;
      } else if (errorData.username) {
        errorMessage = `Usuario: ${errorData.username[0]}`;
      } else if (errorData.password || errorData.password2) {
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