import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import ActivityLog from "./pages/ActivityLog";
// import { ToastContainer } from 'react-toastify';
import './App.css'
import Profile from "./pages/Profile";
import Members from "./pages/Members";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/activity-log' element={<ActivityLog />} />
        <Route path='/members' element={<Members />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
