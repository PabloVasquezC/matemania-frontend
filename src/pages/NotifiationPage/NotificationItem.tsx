import SuccessIcon from "@utils/successIcon";
import type { INotification } from "../../types/INotification";
import ErrorIcon from "@utils/errorIcon";

function NotificationItem({ notification }: { notification: INotification }) {
  const getIconForType = (type: INotification["type"]) => {
    switch (type) {
      case "success":
        return <SuccessIcon />;
      case "error":
        return <ErrorIcon />;
      case "info":
      default:
        // Un icono de información genérico, se podría importar de un paquete.
        return (
          <svg
            className="w-6 h-6 text-blue-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      key={notification.id}
      className = {`
							cursor-pointer
							flex 
							items-center 
							p-4 
							rounded-lg
							border-l-4
							shadow-md 
							transition-all 
							duration-300 
							transform hover:scale-[1.02] ${notification.read
							? "bg-gray-700 border-gray-600 text-gray-400"
							: "bg-gray-700 border-teal-500 text-white"
					}`}
    >
      <div className="flex-shrink-0 mr-4">
        {getIconForType(notification.type)}
      </div>
      <div className="flex-1">
        <h3
          className={`font-bold ${
            notification.read ? "text-gray-400" : "text-teal-300"
          }`}
        >
          {notification.title}
        </h3>
        <p className="text-sm mt-1">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
      </div>
    </div>
  );
}

export default NotificationItem;
