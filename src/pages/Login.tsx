import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/userReducer';


function Login() {
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
          dispatch(loginFailure(data.error));
          return;
        } else {
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch(loginSuccess(data));
          navigate('/dashboard');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="signup">
      <div className='p-6 rounded shadow-lg border form-container'>
        <h2 className="text-3xl font-bold text-black mb-6 text-center" >Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full flex flex-col">
            <label className='mt-4 text-start' htmlFor="username">Username</label>
            <input className='mt-2 p-2 border-2 rounded-sm' value={username} type="username" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="w-full flex flex-col">
            <label className='mt-4 text-start' htmlFor="password">Password</label>
            <input className='mt-2 p-2 border-2 rounded-sm' value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='mt-6 mb-6 bg-blue-500 text-white p-2 rounded' type="submit">Login</button>
          <p className="mt-6 text-center">Don't have an account? <Link to="/signup">Signup</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login