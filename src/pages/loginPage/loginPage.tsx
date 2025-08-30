import { useState } from "react";
import axios from "axios";
import type { IRoboHash } from "../../types/IRoboHash"; // Asegúrate de que este tipo sea correcto y esté definido

function LoginPage() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateRobotFromForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.username.trim() === "") return;

    const newRobot: IRoboHash = {
      id: formData.username,
      name: formData.username,
    };
    setChosenRobot(newRobot);
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
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: formData.username,
        password: formData.password,
      });

      // Almacena los tokens en el localStorage para su uso futuro
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      setMessage("Login exitoso. ¡Bienvenido!");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Asume que Django envía el error de forma detallada
        setError(err.response.data.detail || "Error de login. Verifica tus credenciales.");
      } else {
        setError("Error de conexión. Inténtalo de nuevo más tarde.");
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
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });

      // Muestra un mensaje de éxito basado en la respuesta del servidor
      setMessage(response.data.message || "Registro exitoso. ¡Ahora puedes iniciar sesión!");
      setIsLoginView(true); // Cambia automáticamente a la vista de login
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Muestra el mensaje de error que envía Django
        // Esto maneja errores como "El usuario ya existe"
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

      {message && <div className="text-green-500 mb-4">{message}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-8 flex flex-col md:flex-row gap-8">
        {/* Formulario Principal */}
        <div className="flex-1 flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-inner">
          <form onSubmit={isLoginView ? handleLogin : handleSignUp} className="w-full">
            {/* Campo de usuario */}
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

            {/* Campo de email (solo para registro) */}
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

            {/* Campos de contraseña */}
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

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full py-3 mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition duration-300"
            >
              {isLoginView ? "Iniciar Sesión" : "Crear Cuenta"}
            </button>
          </form>

          {/* Opciones de cambio de vista */}
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

        {/* Sección del avatar (sin cambios) */}
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
              className="w-full py-3 mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-bold hover:from-purple-600 hover:to-pink-700 transition duration-300"
            >
              Cambiar Avatar
            </button>
            <button
              className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full font-bold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300"
              onClick={() =>
                alert(`¡Listo para jugar con ${choosenRobot.name}!`)
              }
            >
              ¡Elegir y Jugar!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;