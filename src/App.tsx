
import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/navbar/navbar'
import Homepage from './pages/homepage/homepage';
import AboutPage from './pages/aboutpage/aboutpage';
import SettingsPage from './pages/settingspage/settingspage';
import UserPage from './pages/userpage/userpage';
import Board from './components/board/Board';
import TestComponentsPage from './pages/testComponentsPage/TestComponentsPage';


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/test-components" element={<TestComponentsPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/board" element={<Board />} />

        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </>
  )
}

export default App
