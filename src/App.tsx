import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './layout/navbar/navbar';
import Homepage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/aboutpage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Gamepage from './pages/GamePage/Gamepage';
import Footer from './layout/footer/Footer';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/profilepage';
import RankingPage from './pages/RankingPage/rankingPage';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import NotificationsPage from './pages/NotifiationPage/NotificationsPages';
import { navigation } from './constants/constants';
import { variants } from './utils/animations/framer-motion-utils';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import GameMenu from 'menus/GameMenu';
import TestLayoutPage from '@pages/TestLayoutPage';
import axios from 'axios';

axios.defaults.withCredentials = true;

// Mapea las rutas a un índice para comparar la posición
const pathIndexMap: Record<string, number> = navigation.reduce((map, item, index) => {
  map[item.path] = index;
  return map;
}, {} as Record<string, number>);

function App() {
  const location = useLocation();
  const [direction, setDirection] = useState(0);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prevIndex = pathIndexMap[prevPathRef.current] || 0;
    const currentIndex = pathIndexMap[location.pathname] || 0;
    const newDirection = currentIndex - prevIndex;
    setDirection(newDirection);
    prevPathRef.current = location.pathname;
  }, [location]);

  return (
    <div className="App min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar visible excepto en login */}
      {location.pathname !== '/login' && <Navbar />}

      {/* Contenedor principal para las rutas animadas */}
      <AnimatePresence mode="wait" custom={direction}>
        <div className="flex-grow relative overflow-hidden">
          <Routes location={location}>
            <Route
              path="/"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <Homepage />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <LoginPage />
                </motion.div>
              }
            />
            <Route
              path="/gamemenu"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <GameMenu />
                </motion.div>
              }
            />
            <Route
              path="/game"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <Gamepage />
                </motion.div>
              }
            />
            <Route
              path="/about"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <AboutPage />
                </motion.div>
              }
            />
            <Route
              path="/settings"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <SettingsPage />
                </motion.div>
              }
            />
            <Route
              path="/profile"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <ProfilePage />
                </motion.div>
              }
            />
            <Route
              path="/notifications"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <NotificationsPage />
                </motion.div>
              }
            />
            <Route
              path="/ranking"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <RankingPage />
                </motion.div>
              }
            />
            <Route
              path="*"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <NotFoundPage />
                </motion.div>
              }
            />
            <Route
              path="/testlayout"
              element={
                <motion.div
                  key={location.pathname}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="w-full min-h-full"
                >
                  <TestLayoutPage />
                </motion.div>
              }
            />
          </Routes>
        </div>
      </AnimatePresence>

      {/* Footer visible excepto en login */}
      {location.pathname !== '/login' && <Footer />}
    </div>
  );
}

export default App;
