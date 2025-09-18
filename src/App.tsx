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
import { variants } from './utils/framer-motion-utils';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

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
    <div className="App h-screen flex flex-col justify-between bg-gray-900 text-white overflow-hidden">
      {location.pathname !== '/login' && <Navbar />}
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
              <Homepage />
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
          <Route path="/notifications" element={
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              className="w-full h-full absolute"
            >
              <NotificationsPage />
            </motion.div>
          } />
          <Route path="/ranking" element={
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              className="w-full h-full absolute"
            >
              <RankingPage />
            </motion.div>
          } />
          {/* Aquí va la página 404 */}
          <Route path="*" element={
            <motion.div
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              className="w-full h-full absolute"
            >
              <NotFoundPage />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
      {location.pathname !== '/login' && <Footer />}
    </div>
  )
}

export default App;
