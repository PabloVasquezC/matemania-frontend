import { logout } from "@services/authService";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

function LogoutButton({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleLogout = async () => {
    try {
      await logout();
      if (onClick) {
        onClick();
      }
    } catch (err) {
      console.error("Error en logout:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
    >
      Cerrar Sesión
    </button>
  );
}

export default LogoutButton;
