import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { useState, useRef } from 'react';
import React from 'react'; // Importamos React
import logo from '../../assets/logo.png';



const navigation = [
  { name: 'Inicio', path: '/' },
  { name: 'Jugar', path: '/game' },
  { name: 'Acerca de', path: '/about' },
  { name: 'Configuraciones', path: '/settings' },
  { name: 'Perfil', path: '/profile' },
  { name: 'Ranking', path: '/ranking' },
  { name: 'Notificaciones', path: '/notifications' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// Componente del modal terminal
const TerminalModal = ({ onClose }: { onClose: () => void }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className=" justify-center items-center fixed z-50 w-full max-w-xl p-1 bg-gray-900 rounded-lg shadow-2xl overflow-hidden font-mono"
      style={{ top: position.y, left: position.x }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="flex items-center justify-between p-2 cursor-grab text-white bg-gray-800 rounded-t-lg"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-semibold">Terminal</span>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full transition-colors duration-200">
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto text-sm text-gray-200 bg-gray-950 rounded-b-lg border-t border-gray-800">
        <p className="text-lime-400">$ Bienvenido a la terminal de CogniTiles...</p>
        <p className="text-gray-400">Escribe 'ayuda' para ver los comandos disponibles.</p>
        <p className="mt-2 text-lime-400">$</p>
      </div>
    </div>
  );
};

export default function Navbar() {
  const location = useLocation();
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <>
      <Disclosure
        as="nav"
        className="shadow-xl fixed w-full bg-gray-800/60 backdrop-blur-md rounded-b-lg border-b border-gray-700/50 z-20 transition-all duration-300"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Botón menú móvil */}
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>

            {/* Logo + navegación */}
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <div className="flex shrink-0 items-center">
                <Link to="/">
                  <img
                  className="block h-12 w-auto"
                  src={logo}
                  alt="CogniTiles Logo"
                />
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center">
                <div className="flex space-x-4">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        aria-current={isActive ? 'page' : undefined}
                        className={classNames(
                          isActive
                            ? 'bg-gray-950/50 text-white shadow-inner'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200'
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  <button
                    onClick={() => setShowTerminal(!showTerminal)}
                    className={classNames(
                      'text-gray-300 hover:bg-white/5 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200'
                    )}
                  >
                    Terminal
                  </button>
                </div>
              </div>
            </div>

            {/* Botón notificaciones + perfil */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <button
                type="button"
                className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 transition-colors duration-200 transform hover:scale-110"
              >
                <BellIcon aria-hidden="true" className="size-6 cursor-pointer" />
              </button>
              {/* dropdown usuario */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-transform duration-200 transform hover:scale-110">
                  <img src={`https://robohash.org/${localStorage.getItem('userAvatar')}.png`} alt="User Avatar" className="h-10 w-10 rounded-full border border-gray-600  cursor-pointer" />
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10">
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Your profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Settings
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Sign out
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/notifications"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                    >
                      Notificaciones
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <DisclosurePanel className="md:hidden bg-gray-800/60 backdrop-blur-md rounded-b-lg border-b border-gray-700/50">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={classNames(
                    isActive
                      ? 'bg-gray-950/50 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              )
            })}
          </div>
        </DisclosurePanel>
      </Disclosure>

      {/* Renderiza el modal si showTerminal es verdadero */}
      {showTerminal && <TerminalModal onClose={() => setShowTerminal(false)} />}
    </>
  )
}