import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { IRoboHash } from "../../types/IRoboHash";
import SuccessIcon from "@utils/successIcon";
import ErrorIcon from "@utils/errorIcon";
import handleGenerateRandomRobot from "@utils/handleGenerateRandomRobots";
import { login, signup } from "@services/authService";
import logo from "@assets/logo.png";
import { loginSuccessSound, errorSound } from "../../soundsManager"; // <-- 1. Importar errorSound
import { useUserStore } from "store/useUserStore";
import { getProfile } from '@services/authService';
import { unlockAudioContext } from "../../utils/unlockAudioContext";

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
    avatar: "",
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
      playLoginSuccess(); // <-- Sonido de éxito aquí
      setTimeout(() => navigate("/"), 150);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
      playErrorSound(); // <-- Sonido de error aquí
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
      playErrorSound(); // <-- Sonido de error aquí
      return;
    }

    try {
      const response = await signup({
        ...formData,
        confirmPassword: formData.confirmPassword,
        avatar: `https://robohash.org/${choosenRobot?.id}.png`,
      });
      setMessage(response.message || "Registro exitoso. ¡Ahora puedes iniciar sesión!");
      playLoginSuccess(); // <-- Sonido de éxito para registro exitoso
      setIsLoginView(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
      playErrorSound(); // <-- Sonido de error aquí
      console.error(err);
    }
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

        <p className="text-center text-gray-400 mt-4">
          {isLoginView ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
          <button 
            onClick={() => {
              unlockAudioContext();
              setIsLoginView(!isLoginView);
              setFormData({ username: "", password: "", email: "", confirmPassword: "", avatar: "" });
              setError("");
              setPasswordStrength("");
              // loginSuccessSound.play(); // No se si quieres sonido aquí.
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