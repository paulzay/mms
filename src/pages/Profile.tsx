import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import penguin from '../assets/penguin.png';

function Profile() {
  const [user, setUser] = useState({ username: '', email: '', dob: '', role: '', avatar: '', password: '' });
  const [edit, setedit] = useState(false);
  const id = useSelector((state: any) => state.user.user.id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('clicked')
    console.log(user)
  }

  useEffect(() => {
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      console.log(data);
      setUser(data);
      console.log(new Date(data.dob).toISOString().split('T')[0])
    }).catch(err => {
      console.log(err);
    })
  }, [id])

  // function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setUser({ ...user, avatar: reader.result as string });
  //     }
  //     reader.readAsDataURL(file);
  //   }
  // }

  // function formatDate(date: string) {
  //   return new Date(date).toISOString().split('T')[0];
  // }
  return (
    <div>
      <div className='w-80 ml-auto mr-auto border shadow-lg p-6 mt-6 mb-6'>
        <div className='flex justify-center'>
          <img id='avatar' src={user.avatar ? user.avatar : penguin} alt="Profile" className='w-32 h-32 rounded-full border-2 border-white shadow-md' />
        </div>
        <button className='mt-6 mb-6 bg-blue-500 text-white p-2 rounded w-24' onClick={() => setedit(!edit)}>Edit</button>
        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
          <div className="w-full flex flex-col">
            <label className='text-start' htmlFor="username">Username</label>
            <input className='mt-2 p-2 border-2 rounded-sm' disabled={!edit} value={user.username} type="text" placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
          </div>

          <div className="w-full flex flex-col">
            <label className='mt-4 text-start' htmlFor="email">Email</label>
            <input className='mt-2 p-2 border-2 rounded-sm' disabled={!edit} value={user.email} type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </div>

          <div className="w-full flex flex-col justify-start">
            <label className='mt-4 text-start' htmlFor="dob">Date of Birth</label>
            <input className='mt-2 p-2 border-2 rounded-sm' disabled={!edit} value={user.dob} type="date" placeholder="Date of Birth" onChange={(e) => setUser({ ...user, dob: e.target.value })} />
          </div>

          <div className="w-full flex flex-col">
            <label className='mt-4 text-start' htmlFor="role">Role</label>
            <select className='mt-2 p-2 border-2 rounded-sm' disabled={!edit} value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="w-full flex flex-col">
            <label className='mt-4 text-start' htmlFor="avatar">Avatar</label>
            <input className='mt-2 p-2 border-2 rounded-sm' disabled={!edit} name='avatar' value={user.avatar} type="file" placeholder="Profile Picture" onChange={(e) => setUser({ ...user, avatar: e.target.value })} />
          </div>

          <div className="w-full flex flex-col">
            <label className='mt-4 text-start' htmlFor="password">Password</label>
            <input className='mt-2 p-2 border-2 rounded-sm' disabled={!edit} value={user.password} type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </div>
          {
            edit ?

              <div className='flex flex-row justify-center'>
                <button className='bg-red-500 mt-6 mb-6 mr-2 text-white w-24' onClick={() => setedit(false)}>Cancel</button>
                <button className='mt-6 mb-6 ml-2 bg-blue-500 text-white p-2 w-24' type="submit">Save</button>
              </div> : null
          }

        </form>
      </div>
    </div>
  )
}

export default Profile