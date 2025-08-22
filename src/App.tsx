
import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/navbar/navbar'
import Homepage from './pages/homepage/homepage';
import AboutPage from './pages/aboutpage/aboutpage';
import SettingsPage from './pages/settingspage/settingspage';
import UserPage from './pages/userpage/userpage';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/user" element={<UserPage />} />

        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </>
  )
}

export default App
