import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// =================================================================
// IMPORTACIONES REALES DEL PROYECTO
// Asumiendo que estas rutas son CORRECTAS en la estructura de tu proyecto:
import { getProfile } from 'services/authService'; 
import { useUserStore } from 'store/useUserStore'; 
// =================================================================


const SocialAuthCallback = () => {
  const navigate = useNavigate();
  // Obtiene la función setUser del store de Zustand
  const { setUser } = useUserStore(); 

  useEffect(() => {
    // 1. EXTRAER TOKENS del hash de la URL
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.substring(1));
    
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    if (accessToken && refreshToken) {
      console.log("Tokens JWT recibidos. Guardando en localStorage y obteniendo perfil.");
      
      // 2. GUARDAR TOKENS en el almacenamiento local
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // 3. LIMPIAR URL: Elimina el hash con los tokens de la barra de direcciones
      if (window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname);
      } else {
          // Fallback, aunque replaceState es mejor
          navigate(window.location.pathname, { replace: true });
      }
      
      // 4. Obtener el perfil del usuario usando el nuevo Access Token
      const fetchProfileAndNavigate = async () => {
        try {
          // Llama a la función REAL de tu servicio de autenticación
          const userProfile = await getProfile(); 
          
          // Guarda el perfil del usuario en el store global (Zustand)
          setUser(userProfile);
          
          // Redirigir al dashboard o página de inicio
          navigate("/", { replace: true }); 
        } catch (error) {
          console.error("Error al obtener perfil después del login social:", error);
          // Redirigir a login con error si falla la obtención del perfil
          // También limpia los tokens, ya que falló la validación final.
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login?error=profile_fetch_fail", { replace: true });
        }
      };

      fetchProfileAndNavigate();
      
    } else {
        // Manejar caso de error: tokens faltantes, usuario canceló, o error en Django
        console.error("Fallo el login social o no se recibieron tokens.");
        navigate("/login?error=social_auth_failed", { replace: true });
    }
  }, [navigate, setUser]); 

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center p-6 bg-gray-800 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-teal-400">
          Iniciando Sesión con Google
        </h2>
        <p className="text-gray-300 mb-6">Estamos finalizando la validación de tu cuenta...</p>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default SocialAuthCallback;