import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/configureStore';
import penguin from '../assets/penguin.png';
import { useState } from "react";
import { logout } from "../redux/userReducer";
import Search from "./Search";

function Navbar() {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setOpenMenu(false);
    navigate('/login');
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('searching for', searchInput);
      // navigate(`/members?q=${searchInput}`);
    }
  }

  return (
    <nav className='flex justify-between w-full p-5 bg-white shadow-lg sticky text-black top-0 left-0'>
      <h2 className='p-2'>MSM</h2>
      <ul className='flex align-middle'>
        {
          loggedIn ?
            <>
              <NavLink to="/dashboard" className='p-2'>Dashboard</NavLink>
              <NavLink to="/about" className='p-2'>About</NavLink>
              <NavLink to="/members" className='p-2'>Members</NavLink>
              <Search query={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyUp={handleSearch} />
              <img src={penguin} alt="profile" className='w-10 h-10 rounded-full ml-2 cursor-pointer' onClick={() => setOpenMenu(!openMenu)} />
              {openMenu && <div className='absolute flex flex-col top-14 right-0 bg-white shadow-lg rounded-lg p-2'>
                <NavLink to="/profile" className='p-2'>Profile</NavLink>
                <button type="button" className='p-2 bg-transparent' onClick={handleLogout}>Logout</button>
              </div>}
            </>
            : <>
              <NavLink to="/login" className='p-2'>Login</NavLink>
              <NavLink to="/signup" className='p-2'>Signup</NavLink>
            </>
        }
      </ul>
    </nav>
  )
}

export default Navbar