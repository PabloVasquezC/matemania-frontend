import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SuccessIcon from "@utils/successIcon";
import ErrorIcon from "@utils/errorIcon";

// Define una interfaz para el tipo de datos de las notificaciones.
// Esto es una buena práctica en TypeScript para asegurar la consistencia.
interface INotification {
  id: number;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Datos de ejemplo para simular notificaciones. En un caso real, esto vendría de una API.
const DUMMY_NOTIFICATIONS: INotification[] = [
  {
    id: 1,
    type: 'success',
    title: "¡Partida Ganada!",
    message: "¡Felicidades! Has superado la partida con 150 puntos.",
    timestamp: "Hace 2 minutos",
    read: false,
  },
  {
    id: 2,
    type: 'info',
    title: "Actualización de Reglas",
    message: "Se han añadido nuevos operadores matemáticos. ¡Consulta las reglas!",
    timestamp: "Hace 1 hora",
    read: false,
  },
  {
    id: 3,
    type: 'error',
    title: "Error de Conexión",
    message: "No se pudo conectar al servidor de juego. Inténtalo de nuevo.",
    timestamp: "Hace 3 horas",
    read: true,
  },
  {
    id: 4,
    type: 'success',
    title: "Nuevo Logro Desbloqueado",
    message: "Has completado el desafío 'Calculista'.",
    timestamp: "Ayer",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    // Simula la carga de notificaciones de una API.
    setNotifications(DUMMY_NOTIFICATIONS);
  }, []);

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  // Función para renderizar el icono adecuado según el tipo de notificación.
  const getIconForType = (type: INotification['type']) => {
    switch (type) {
      case 'success':
        return <SuccessIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'info':
      default:
        // Un icono de información genérico, se podría importar de un paquete.
        return (
          <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
      <header className="mb-10 text-center animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse">
          Notificaciones
        </h1>
        <p className="text-lg md:text-xl text-gray-400">
          Revisa las últimas novedades de tus partidas y logros.
        </p>
      </header>

      <main className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 transform transition-all duration-500 hover:scale-[1.01]">
        <section className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-400 animate-slideIn">
            Mensajes Recientes
          </h2>
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm font-semibold text-gray-400 hover:text-white transition duration-200"
            >
              Marcar todo como leído
            </button>
          )}
        </section>

        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`flex items-center p-4 rounded-lg border-l-4 shadow-md transition-all duration-300 transform hover:scale-[1.02] ${
                  notification.read ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-700 border-teal-500 text-white'
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  {getIconForType(notification.type)}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold ${notification.read ? 'text-gray-400' : 'text-teal-300'}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-400">
            <p className="text-lg">No tienes notificaciones por el momento. ¡Todo en orden!</p>
            <Link to="/home" className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
              Volver a Inicio
            </Link>
          </div>
        )}
      </main>

      {/* Definiciones de animaciones de Tailwind CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out; }
        .animate-pulse { animation: pulse 2s infinite; }
        .animate-slideIn { animation: slideIn 1s ease-out; }
      `}</style>
    </div>
  );
}