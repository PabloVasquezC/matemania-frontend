import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";
import "./navbar.css";

import { Terminal } from "@components/Terminal/Terminal";
import { useUserStore } from "store/useUserStore";
import type { IUserState } from "../../types/IUserState";
import LogoutButton from "./LogoutButton";

const navigation = [
  { name: "Inicio", path: "/" },
  { name: "Jugar", path: "/gamemenu" },
  { name: "Acerca de", path: "/about" },
  { name: "Configuraciones", path: "/settings" },
  { name: "Perfil", path: "/profile" },
  { name: "Ranking", path: "/ranking" },
  { name: "Notificaciones", path: "/notifications" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const user = useUserStore((state: IUserState) => state.user);

  // console.log("Token en Navbar:", localStorage.getItem("access_token")); // Verifica si el token está presente
  const location = useLocation();
  const [showTerminal, setShowTerminal] = useState(false);

  // function handleIsLoggedInChange(loggedIn: boolean) {
  //   setIsLoggedIn(!loggedIn);
  // }

  return (
    <>
      <Disclosure
        as="nav"
        className="shadow-md fixed w-full bg-gray-800/60 backdrop-blur-md rounded-b-lg border-b border-gray-700/50 z-20 transition-all duration-300"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Contenedor del logo a la izquierda */}
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img
                  className="block h-12 w-auto"
                  src={logo}
                  alt="Matemanía Logo"
                />
              </Link>
            </div>

            {/* Contenedor de iconos y menú a la derecha */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 transition-colors duration-200 transform hover:scale-110"
              >
                <Link to="/notifications">
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
              </button>
              <Menu as="div" className=" relative ml-3">
                <MenuButton className=" relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-transform duration-200 transform hover:scale-110">
                  <div className=" rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400">
                    {user && user.avatar ? (
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.avatar}
                        alt="User Avatar"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                </MenuButton>
                <MenuItems className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10">
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Tu perfil
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Configuración
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    {user ? (
                      <LogoutButton />
                    ) : (
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                      >
                        Iniciar Sesión
                      </Link>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
              {/* Botón de hamburguesa a la derecha */}
              <DisclosureButton className="cursor-pointer group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        {/* Este panel ahora es el único lugar para ver los enlaces de navegación */}
        <DisclosurePanel className="bg-gray-800/60 backdrop-blur-md rounded-b-lg border-b border-gray-700/50">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={classNames(
                    isActive
                      ? "bg-gray-950/50 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              );
            })}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowTerminal(!showTerminal)}
                className={classNames(
                  "text-gray-300 hover:bg-white/5 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
                )}
              >
                Terminal
              </button>
            </div>
          </div>
        </DisclosurePanel>
        <div id="progress" className="bg-gradient-to-r from-teal-400 to-blue-500"></div>
      </Disclosure>

      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
    </>
  );
}
