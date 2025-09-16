import type { INotification } from "../../types/INotification";

// Datos de ejemplo para simular notificaciones. En un caso real, esto vendría de una API.

export const DUMMY_NOTIFICATIONS: INotification[] = [
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

