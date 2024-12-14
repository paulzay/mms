import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Member } from '../types';

function Members() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch('http://localhost:8000/users')
        .then(response => {
          if (response.status === 401) {
            navigate('/login');
          }
          return response.json();
        })
        .then(data => setMembers(data))
    ]).catch((error) => {
      console.log(error);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      {
        members.map((member: Member) => (
          <div key={member.id} className="flex justify-between p-4 border-b">
            <div>
              <h3>{member.username}</h3>
              <p>{member.email}</p>
            </div>
            <div className='flex'>
              <button className="bg-blue-500 text-white p-2 rounded w-24 mr-2">Edit</button>
              <button className="bg-red-500 text-white p-2 rounded w-24 ml-2" >Delete</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Members