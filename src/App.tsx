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

const pageVariants = {
  initial: {
    opacity: 0,
    x: "100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "-100vw",
  }
};

const pageTransition = {
  ease: "anticipate",
  duration: 0.5
};

function App() {
  const location = useLocation();

  return (
    <div className="App h-screen flex flex-col justify-between bg-gray-900 text-white">
      {location.pathname !== '/login'  && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="w-full h-full"
            >
              <HomePage />
            </motion.div>
          } />
          <Route path="/login" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="w-full h-full"
            >
              <LoginPage />
            </motion.div>
          } />
          <Route path="/home" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="w-full h-full"
            >
              <Homepage />
            </motion.div>
          } />
          <Route path="/game" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="w-full h-full"
            >
              <Gamepage />
            </motion.div>
          } />
          <Route path="/about" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="w-full h-full"
            >
              <AboutPage />
            </motion.div>
          } />
          <Route path="/settings" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="w-full h-full"
            >
              <SettingsPage />
            </motion.div>
          } />
          <Route path="/profile" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="w-full h-full"
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
