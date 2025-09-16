import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { INotification } from "../../types/INotification";
import { DUMMY_NOTIFICATIONS } from "example/data/dumy-notifications";
import NotificationItem from "./NotificationItem";


// Define una interfaz para el tipo de datos de las notificaciones.
// Esto es una buena práctica en TypeScript para asegurar la consistencia.


// Datos de ejemplo para simular notificaciones. En un caso real, esto vendría de una API.


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
              <NotificationItem key={notification.id} notification={notification} />
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