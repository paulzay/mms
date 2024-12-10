import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/configureStore';

function Navbar() {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  return (
    <nav className='flex justify-between w-full p-5 bg-white shadow-lg sticky text-black top-0 left-0'>
      <h2 className='p-2'>MSM</h2>
      <ul className='flex'>
        <NavLink to="/home" className='p-2'>Home</NavLink>
        <NavLink to="/about" className='p-2'>About</NavLink>
        {
          loggedIn ?
            <NavLink to="/dashboard" className='p-2'>Profile</NavLink> : <>
              <NavLink to="/login" className='p-2'>Login</NavLink>
              <NavLink to="/signup" className='p-2'>Signup</NavLink>
            </>
        }
      </ul>
    </nav>
  )
}

export default Navbar