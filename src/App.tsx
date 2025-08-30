
import { Route, Routes, useLocation } from 'react-router'
import './App.css'
import Navbar from './layout/navbar/navbar'
import Homepage from './pages/homepage/homepage';
import AboutPage from './pages/aboutpage/aboutpage';
import SettingsPage from './pages/settingspage/settingspage';
import UserPage from './pages/userpage/userpage';
import Gamepage from './pages/gamepage/Gamepage';
import Footer from './layout/footer/Footer';
import LoginPage from './pages/loginPage/loginPage';


function App() {
  const location = useLocation();

  return (
    <div className="App h-screen flex flex-col justify-between">
      {location.pathname !== '/'  && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage  />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/game" element={<Gamepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
      {location.pathname !== '/game'  && <Footer />}
    </div>
  )
}

export default App