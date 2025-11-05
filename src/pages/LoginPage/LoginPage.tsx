import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { IRoboHash } from "../../types/IRoboHash";
// Rutas corregidas de Alias (@utils) a relativas (../../utils)
import SuccessIcon from "../../utils/successIcon"; 
import ErrorIcon from "../../utils/errorIcon";
import handleGenerateRandomRobot from "../../utils/handleGenerateRandomRobots";
// Rutas corregidas de Alias (@services) a relativas (../../services)
import { login, signup } from "../../services/authService";
import { getProfile } from '../../services/authService';
// Ruta corregida de Alias (@assets) a relativa (../../assets)
import logo from "../../assets/logo.png";
// Ruta corregida para la tienda de estado
import { useUserStore } from "../../store/useUserStore";
// Importaciones ya relativas o corregidas
import { loginSuccessSound, errorSound } from "../../soundsManager"; 
import { unlockAudioContext } from "../../utils/unlockAudioContext";
import { API_URL } from "../../constants/constants"; 

function LoginPage() {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [choosenRobot, setChosenRobot] = useState<IRoboHash>({ id: "", name: "" });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    avatar: "", // Mantenemos el campo en el estado local
  });
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | "">("");

  const generateNewRobot = useCallback(() => {
    handleGenerateRandomRobot(setChosenRobot);
  }, []);

  useEffect(() => {
    generateNewRobot();
  }, [generateNewRobot]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") evaluatePasswordStrength(value);
    setFormData({ ...formData, [name]: value });
  };

  const evaluatePasswordStrength = (password: string) => {
    if (password.length < 6) setPasswordStrength("weak");
    else if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8)
      setPasswordStrength("strong");
    else setPasswordStrength("medium");
  };

  // Función para reproducir el sonido de éxito
  const playLoginSuccess = () => {
    loginSuccessSound.play();
    loginSuccessSound.once("playerror", () => {
      console.error("Error reproduciendo audio. Reintentando...");
      loginSuccessSound.play();
    });
  };

  // Función para reproducir el sonido de error
  const playErrorSound = () => {
    errorSound.play();
    errorSound.once("playerror", () => {
      console.error("Error reproduciendo audio de error. Reintentando...");
      errorSound.play();
    });
  };

  const { setUser } = useUserStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    unlockAudioContext();
    setError("");
    setMessage("");

    try {
      const response = await login(formData);
      localStorage.setItem("access_token", response.access || "");
      localStorage.setItem("refresh_token", response.refresh || "");
      
      const userProfile = await getProfile();
      setUser(userProfile);

      setMessage("Login exitoso. ¡Bienvenido!");
      playLoginSuccess(); 
      setTimeout(() => navigate("/"), 150);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
      playErrorSound(); 
      console.error(err);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    unlockAudioContext(); 
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      playErrorSound(); 
      return;
    }

    try {
      const response = await signup({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        confirmPassword: formData.confirmPassword,
      });
      
      setMessage(response.message || "Registro exitoso. ¡Ahora puedes iniciar sesión!");
      playLoginSuccess(); 
      setIsLoginView(true); // Cambiamos a la vista de login
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
      playErrorSound(); 
      console.error(err);
    }
  };

  // Función para manejar el inicio de sesión con Google
  const handleGoogleLogin = () => {
      unlockAudioContext();
      setError("");
      setMessage("");

      // La URL completa a la que redirige Django allauth para Google
      const googleLoginUrl = `${API_URL}/auth/google/login/`;
      
      console.log("Redirigiendo a Google OAuth:", googleLoginUrl);
      
      // Redirige al usuario al endpoint de Django, que a su vez redirigirá a Google
      window.location.href = googleLoginUrl;
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <img src={logo} alt="Logo" className="w-80 h-80 animate-fadeIn" />
      <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse">
        Matemanía
      </h1>
      <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse">
        {isLoginView ? "Iniciar Sesión" : "Crear tu Perfil"}
      </h1>

      {message && (
        <div className="w-full max-w-lg mb-4 p-4 rounded-lg bg-green-900 border border-green-700 flex items-center justify-center space-x-2 shadow-lg">
          <SuccessIcon />
          <span className="text-green-300 font-medium">{message}</span>
        </div>
      )}

      {error && (
        <div className="w-full max-w-lg mb-4 p-4 rounded-lg bg-red-900 border border-red-700 flex items-center justify-center space-x-2 shadow-lg">
          <ErrorIcon />
          <span className="text-red-300 font-medium">{error}</span>
        </div>
      )}

      <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-2xl p-8">
        <form onSubmit={isLoginView ? handleLogin : handleSignUp} className="w-full">
          {/* ... Campos de Usuario/Email/Contraseña ... */}
          <label className="block text-lg font-semibold mb-2 text-teal-300">Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ingresa tu nombre de usuario"
            className="w-full p-3 mb-4 rounded-lg bg-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
          />

          {!isLoginView && (
            <>
              <label className="block text-lg font-semibold mb-2 text-teal-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu email"
                className="w-full p-3 mb-4 rounded-lg bg-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
              />
            </>
          )}

          <label className="block text-lg font-semibold mb-2 text-teal-300">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            className="w-full p-3 mb-2 rounded-lg bg-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
          />

          {!isLoginView && passwordStrength && (
            <div className="mb-4">
              <div
                className={`h-2 rounded-lg transition-all ${
                  passwordStrength === "weak"
                    ? "bg-red-500 w-1/3"
                    : passwordStrength === "medium"
                    ? "bg-yellow-500 w-2/3"
                    : "bg-green-500 w-full"
                }`}
              />
              <p
                className={`mt-1 text-sm font-semibold ${
                  passwordStrength === "weak"
                    ? "text-red-400"
                    : passwordStrength === "medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {passwordStrength === "weak"
                  ? "Contraseña débil"
                  : passwordStrength === "medium"
                  ? "Contraseña media"
                  : "Contraseña fuerte"}
              </p>
            </div>
          )}

          {!isLoginView && (
            <>
              <label className="block text-lg font-semibold mb-2 text-teal-300">Confirma la Contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
                className="w-full p-3 mb-6 rounded-lg bg-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
              />
            </>
          )}

          {/* Bloque de selección de Avatar (solo en registro) */}
          {!isLoginView && (
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2 text-teal-300">Elige tu Avatar</label>
              <div className="flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={generateNewRobot}
                  className="p-2 text-gray-400 hover:text-white transition-colors text-3xl font-bold cursor-pointer"
                  aria-label="Anterior Robot"
                >
                  ‹
                </button>
                <div className="w-24 h-24 flex items-center justify-center">
                  {!choosenRobot || !choosenRobot.id ? (
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-400"></div>
                  ) : (
                    <img
                      src={`https://robohash.org/${choosenRobot.id}.png`}
                      alt="Robot Preview"
                      className="w-24 h-24 rounded-full border-4 border-gray-600 shadow-lg"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={generateNewRobot}
                  className="p-2 text-gray-400 hover:text-white transition-colors text-3xl font-bold cursor-pointer"
                  aria-label="Siguiente Robot"
                >
                  ›
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            {isLoginView ? "Iniciar Sesión" : "Crear Cuenta"}
          </button>
        </form>

        {/* --- NUEVO BOTÓN DE GOOGLE --- */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400 text-sm">O</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-gray-700 rounded-lg font-bold text-white hover:bg-gray-600 transition duration-300 flex items-center justify-center space-x-3 shadow-md"
        >
            <svg viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.675-6.19 7.734-11.303 7.734c-6.805 0-12.342-5.537-12.342-12.342c0-6.806 5.537-12.342 12.342-12.342c3.344 0 6.427 1.258 8.423 3.321l5.483-5.334c-3.79-3.692-8.62-5.992-14.331-5.992c-11.082 0-20 8.918-20 20s8.918 20 20 20c11.082 0 18.33-7.79 19.342-18.069z"/>
                <path fill="#FF3D00" d="M6.306 14.691L12.784 18.995C14.735 15.688 17.836 13.528 20 13.528c3.344 0 6.427 1.258 8.423 3.321l5.483-5.334C31.59 7.844 26.69 5.083 20 5.083C8.918 5.083 0 13.901 0 25s8.918 19.917 20 19.917c8.067 0 14.868-4.992 17.551-12.285l-5.748-4.706C28.468 31.815 24.3 35.083 20 35.083c-5.113 0-9.654-3.059-11.303-7.734L6.306 31.979z"/>
                <path fill="#4CAF50" d="M6.306 14.691L1.517 9.357A19.92 19.92 0 000 25c0 4.191 1.054 8.169 2.924 11.536L8.038 31.52c-1.397-2.736-2.147-5.836-2.147-9.083z"/>
                <path fill="#1976D2" d="M43.611 20.083h-1.611V20H24v8h11.303c-1.649 4.675-6.19 7.734-11.303 7.734c-5.113 0-9.654-3.059-11.303-7.734L2.924 36.536A19.92 19.92 0 0020 45c11.082 0 20-8.918 20-20c0-1.391-.144-2.75-.411-4.083h-5.978l-2.022-2.022z"/>
            </svg>
            <span>Iniciar Sesión con Google</span>
        </button>
        {/* --- FIN NUEVO BOTÓN --- */}


        <p className="text-center text-gray-400 mt-4">
          {isLoginView ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
          <button 
            onClick={() => {
              unlockAudioContext();
              setIsLoginView(!isLoginView);
              setFormData({ username: "", password: "", email: "", confirmPassword: "", avatar: "" });
              setError("");
              setPasswordStrength("");
            }}
            className="text-teal-400 hover:underline font-semibold"
          >
            {isLoginView ? "Regístrate" : "Inicia Sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;