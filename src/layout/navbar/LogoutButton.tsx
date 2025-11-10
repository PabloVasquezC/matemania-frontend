import { logout } from "@services/authService";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

// ⭐️ INTERFAZ DE PROPS CORREGIDA
interface LogoutButtonProps {
  onClick?: () => void;
  className?: string; // Permitimos que className sea opcional (ya que el botón tiene un default)
  onMouseEnter?: () => void; // Permitimos el evento de hover
}

// ⭐️ Aceptamos las props en el componente
function LogoutButton({ onClick, className, onMouseEnter }: LogoutButtonProps) {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleLogout = async () => {
    try {
      await logout();
      if (onClick) {
        // Ejecuta la función de sonido/clic al final de la operación, si existe
        onClick(); 
      }
    } catch (err) {
      console.error("Error en logout:", err);
    } finally {
      // Limpieza local (se hace en finally para asegurar que se limpie incluso si falla la llamada al backend)
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
      navigate("/");
    }
  };

  // Definimos clases por defecto si className no viene del padre
  const defaultClassName = "block px-4 py-2 text-sm text-gray-300 hover:bg-white/5";

  return (
    <button
      onClick={handleLogout}
      // ⭐️ APLICAMOS LA CLASE DEL PADRE O LA CLASE POR DEFECTO
      className={className || defaultClassName} 
      // ⭐️ APLICAMOS EL EVENTO DE HOVER
      onMouseEnter={onMouseEnter}
    >
      Cerrar Sesión
    </button>
  );
}

export default LogoutButton;