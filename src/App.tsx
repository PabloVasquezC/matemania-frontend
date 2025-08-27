
import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './layout/navbar/navbar'
import Homepage from './pages/homepage/homepage';
import AboutPage from './pages/aboutpage/aboutpage';
import SettingsPage from './pages/settingspage/settingspage';
import UserPage from './pages/userpage/userpage';
import Gamepage from './pages/gamepage/Gamepage';
import Footer from './layout/footer/Footer';


function App() {

  return (
    <div className="App h-screen flex flex-col justify-between">
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
    </div>
  )
}

export default App
