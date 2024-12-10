import { useState } from 'react'
import { Link, redirect } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'
// import { RootState } from '../redux/store'

function Signup() {
  // const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('user');
  const [profilePicture, setProfilePicture] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, dob, role, profilePicture, password })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        alert(data.error);
        return;
      } else {
        redirect('/login');
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='signup'>
      <div className='p-6 rounded shadow-lg border form-container'>
        <h2 className='text-3xl font-bold text-black mb-6 text-center'>Signup</h2>
        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
          <div className="w-full flex flex-col">
            <label className='text-start' htmlFor="username">Username</label>
            <input className='mt-2 p-2 border-2 rounded-sm' value={username} type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
          </div>

          <div className="w-full flex flex-col">
            <label className='mt-4 text-start' htmlFor="email">Email</label>
            <input className='mt-2 p-2 border-2 rounded-sm' value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="w-full flex flex-col justify-start">
            <label className='mt-4 text-start' htmlFor="dob">Date of Birth</label>
            <input className='mt-2 p-2 border-2 rounded-sm' value={dob} type="date" placeholder="Date of Birth" onChange={(e) => setDob(e.target.value)} />
          </div>

          <div className="w-full flex flex-col">
            <label className='mt-4 text-start' htmlFor="role">Role</label>
            <select className='mt-2 p-2 border-2 rounded-sm' value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="w-full flex flex-col">
            <label className='mt-4 text-start' htmlFor="avatar">Profile Picture</label>
            <input className='mt-2 p-2 border-2 rounded-sm' value={profilePicture} type="file" placeholder="Profile Picture" onChange={(e) => setProfilePicture(e.target.value)} />
          </div>

          <div className="w-full flex flex-col">
            <label className='mt-4 text-start' htmlFor="password">Password</label>
            <input className='mt-2 p-2 border-2 rounded-sm' value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='mt-6 mb-6 bg-blue-500 text-white p-2 rounded' type="submit">Signup</button>
          <p className='mt-6 text-center'>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>

  )
}

export default Signup;