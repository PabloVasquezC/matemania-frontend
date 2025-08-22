
import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/navbar/navbar'
import Homepage from './pages/homepage/homepage';
import AboutPage from './pages/aboutpage/aboutpage';
import SettingsPage from './pages/settingspage/settingspage';
import UserPage from './pages/userpage/userpage';
import Board from './components/board/Board';
import Gamepage from './pages/gamepage/Gamepage';
import Footer from './components/footer/Footer';


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<Gamepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/user" element={<UserPage />} />

        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
      <Footer />
    </>
  )
}

export default App
