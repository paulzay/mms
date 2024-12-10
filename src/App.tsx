import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Navbar from "./components/Navbar";
// import { AuthProvider } from './context/AuthContext';
// import { ToastContainer } from 'react-toastify';
import './App.css'

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
      </Routes>
    </BrowserRouter>
    // <AuthProvider>
    //   <ToastContainer />

    // </AuthProvider>
  )
}

export default App
