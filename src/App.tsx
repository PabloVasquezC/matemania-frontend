import { Route, Routes, useLocation } from 'react-router'
import './App.css'
import Navbar from './layout/navbar/navbar'
import Homepage from './pages/homepage/homepage';
import AboutPage from './pages/aboutpage/aboutpage';
import SettingsPage from './pages/settingspage/settingspage';
import Gamepage from './pages/gamepage/Gamepage';
import Footer from './layout/footer/Footer';
import LoginPage from './pages/loginPage/loginPage';
import HomePage from './pages/homepage/homepage';
import ProfilePage from './pages/profilepage/profilepage';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Define el orden de las páginas para la animación direccional
const navigation = [
  { name: 'Inicio', path: '/' },
  { name: 'Jugar', path: '/game' },
  { name: 'Acerca de', path: '/about' },
  { name: 'Configuraciones', path: '/settings' },
  { name: 'Perfil', path: '/profile' },
];

// Mapea las rutas a un índice para comparar la posición
const pathIndexMap: Record<string, number> = navigation.reduce((map, item, index) => {
  map[item.path] = index;
  return map;
}, {} as Record<string, number>);

// Variantes de animación para las transiciones
// Variantes de animación para las transiciones
import type { Variants, Transition } from 'framer-motion';

const transition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    transition
  }),
  center: {
    x: 0,
    opacity: 1,
    transition
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition
  }),
};

function App() {
  const location = useLocation();
  const [direction, setDirection] = useState(0);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prevIndex = pathIndexMap[prevPathRef.current] || 0;
    const currentIndex = pathIndexMap[location.pathname] || 0;
    
    // 1 si la nueva página está "a la derecha" (avanzando)
    // -1 si la nueva página está "a la izquierda" (retrocediendo)
    const newDirection = currentIndex - prevIndex;
    setDirection(newDirection);

    // Actualiza la referencia para la próxima navegación
    prevPathRef.current = location.pathname;
  }, [location]);

  return (
    <div className="App h-screen flex flex-col justify-between bg-gray-900 text-white overflow-hidden">
      {location.pathname !== '/login'  && <Navbar />}
      <AnimatePresence mode="wait" custom={direction}>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              className="w-full h-full absolute"
            >
              <HomePage />
            </motion.div>
          } />
          <Route path="/login" element={
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              className="w-full h-full absolute"
            >
              <LoginPage />
            </motion.div>
          } />
          <Route path="/home" element={
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              className="w-full h-full absolute"
            >
              <Homepage />
            </motion.div>
          } />
          <Route path="/game" element={
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              className="w-full h-full absolute"
            >
              <Gamepage />
            </motion.div>
          } />
          <Route path="/about" element={
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              className="w-full h-full absolute"
            >
              <AboutPage />
            </motion.div>
          } />
          <Route path="/settings" element={
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              className="w-full h-full absolute"
            >
              <SettingsPage />
            </motion.div>
          } />
          <Route path="/profile" element={
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              className="w-full h-full absolute"
            >
              <ProfilePage />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
      {location.pathname !== '/game'  && <Footer />}
    </div>
  )
}

export default App;
