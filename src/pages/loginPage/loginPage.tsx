import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { IRoboHash } from "../../types/IRoboHash";

// Define la URL de la API usando la variable de entorno
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

// Íconos SVG para los mensajes de alerta
const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-green-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2m0 0l4-4m-4 4L7 9m9 4a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-red-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

function LoginPage() {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [choosenRobot, setChosenRobot] = useState<IRoboHash>({ id: "default", name: "Default Robot" });
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateRandomRobot = () => {
    const newRobot: IRoboHash = {
      id: Date.now().toString(),
      name: `Robot #${Math.floor(Math.random() * 1000)}`,
    };
    setChosenRobot(newRobot);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}token/`, {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", formData.username);
      setMessage("Login exitoso. ¡Bienvenido!");
      navigate("/home");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.detail || "Error de login. Verifica tus credenciales.");
      } else {
        setError("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
      }
      console.error(err);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}signup/`, {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });

      setMessage(response.data.message || "Registro exitoso. ¡Ahora puedes iniciar sesión!");
      setIsLoginView(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const serverError = err.response.data.detail || Object.values(err.response.data)[0];
        setError(`Error en el registro: ${serverError}`);
      } else {
        setError("Error de conexión. Inténtalo de nuevo más tarde.");
      }
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse">
        {isLoginView ? "Iniciar Sesión" : "Crear tu Perfil"}
      </h1>

      {/* Alerta de Éxito */}
      {message && (
        <div className="w-full max-w-lg mb-4 p-4 rounded-lg bg-green-900 border border-green-700 flex items-center justify-center space-x-2 shadow-lg">
          <SuccessIcon />
          <span className="text-green-300 font-medium">{message}</span>
        </div>
      )}

      {/* Alerta de Error estilizada */}
      {error && (
        <div className="w-full max-w-lg mb-4 p-4 rounded-lg bg-red-900 border border-red-700 flex items-center justify-center space-x-2 shadow-lg">
          <ErrorIcon />
          <span className="text-red-300 font-medium">{error}</span>
        </div>
      )}

      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-inner">
          <form onSubmit={isLoginView ? handleLogin : handleSignUp} className="w-full">
            <label className="block text-lg font-semibold mb-2 text-teal-300">
              Usuario
            </label>
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
                <label className="block text-lg font-semibold mb-2 text-teal-300">
                  Email
                </label>
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
            <label className="block text-lg font-semibold mb-2 text-teal-300">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              className="w-full p-3 mb-4 rounded-lg bg-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
            />
            {!isLoginView && (
              <>
                <label className="block text-lg font-semibold mb-2 text-teal-300">
                  Confirma la Contraseña
                </label>
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
                setIsLoginView(!isLoginView);
                setFormData({ username: "", password: "", email: "", confirmPassword: "" });
                setError("");
              }}
              className="text-teal-400 hover:underline font-semibold"
            >
              {isLoginView ? "Regístrate" : "Inicia Sesión"}
            </button>
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-inner">
          <div className="flex flex-col items-center mt-4 text-center">
            <img
              src={`https://robohash.org/${choosenRobot.id}.png`}
              alt="Robot Preview"
              className="w-40 h-40 rounded-full border-4 border-gray-600 shadow-lg transform transition duration-500 hover:scale-110"
            />
            <h3 className="text-xl font-semibold mt-4 text-teal-300">
              {choosenRobot.name}
            </h3>
            <button
              onClick={handleGenerateRandomRobot}
              className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-bold hover:from-purple-600 hover:to-pink-700 transition duration-300"
            >
              Cambiar Avatar
            </button>
            <button
              className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full font-bold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300"
              onClick={() => setModalMessage(`¡Listo para jugar con ${choosenRobot.name}!`)
              }
            >
              ¡Elegir y Jugar!
            </button>
          </div>
        </div>
      </div>
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">{modalMessage}</h2>
            <button
              onClick={() => setModalMessage(null)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;