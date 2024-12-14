import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import {
  Users,
  TrendingUp,
  UserPlus,
  UserMinus,
  Calendar
} from 'lucide-react';
import MemberList from '../components/MemberList';

// Mock data service (would be replaced with actual API calls)
const mockDataService = {
  getMemberStatistics: async () => ({
    totalMembers: 1245,
    newMembersThisMonth: 87,
    activeMembers: 1102,
    inactiveMembers: 143,
    memberAgeDistribution: {
      '18-25': 312,
      '26-35': 456,
      '36-45': 287,
      '46-55': 145,
      '56+': 45
    },
    membershipTrends: [
      { month: 'Jan', newMembers: 65 },
      { month: 'Feb', newMembers: 72 },
      { month: 'Mar', newMembers: 87 },
      { month: 'Apr', newMembers: 93 },
      { month: 'May', newMembers: 87 }
    ]
  }),

  quickActions: [
    {
      id: 'add-member',
      icon: <UserPlus className="w-6 h-6 text-green-500" />,
      label: 'Add New Member',
      onClick: () => { /* Open add member modal */ }
    },
    {
      id: 'remove-member',
      icon: <UserMinus className="w-6 h-6 text-red-500" />,
      label: 'Remove Member',
      onClick: () => { /* Open remove member modal */ }
    },
    {
      id: 'add-group',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      label: 'Add New Group',
      onClick: () => { /* Open add group modal */ }
    },
    {
      id: 'remove-group',
      icon: <Users className="w-6 h-6 text-red-500" />,
      label: 'Remove Group',
      onClick: () => { /* Open remove group modal */ }
    },
    {
      id: 'join-group',
      icon: <Users className="w-6 h-6 text-green-500" />,
      label: 'Join Group',
      onClick: () => { /* Open join group modal */ }
    }
  ]
};

function Dashboard() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate()
  // const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const data = {
    totalMembers: 1245,
    newMembersThisMonth: 87,
    activeMembers: 1102,
    inactiveMembers: 143,
    memberAgeDistribution: {
      '18-25': 312,
      '26-35': 456,
      '36-45': 287,
      '46-55': 145,
      '56+': 45
    },
    membershipTrends: [
      { month: 'Jan', newMembers: 65 },
      { month: 'Feb', newMembers: 72 },
      { month: 'Mar', newMembers: 87 },
      { month: 'Apr', newMembers: 93 },
      { month: 'May', newMembers: 87 }
    ]
  }

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
    <div className='flex flex-row-reverse bg-gray-50 min-h-screen'>
      <MemberList members={members} />
      <div className='w-5/6 h-full m-6'>
        {/* Overview Cards */}
        < div className="grid md:grid-cols-4 gap-4 mb-6" >
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <Users className="mr-3 text-blue-500" />
            <div>
              <p className="text-gray-500">Total Members</p>
              <p className="text-2xl font-bold">{data.totalMembers}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <UserPlus className="mr-3 text-green-500" />
            <div>
              <p className="text-gray-500">New This Month</p>
              <p className="text-2xl font-bold">{data.newMembersThisMonth}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <TrendingUp className="mr-3 text-purple-500" />
            <div>
              <p className="text-gray-500">Active Members</p>
              <p className="text-2xl font-bold">{data.activeMembers}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <Calendar className="mr-3 text-red-500" />
            <div>
              <p className="text-gray-500">Inactive Members</p>
              <p className="text-2xl font-bold">{data.inactiveMembers}</p>
            </div>
          </div>
        </div >

        {/* Quick Actions */}
        < div className="mb-6" >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="flex space-x-4">
            {mockDataService.quickActions.map(action => (
              <button
                key={action.id}
                onClick={action.onClick}
                className="bg-white p-4 rounded-lg shadow flex items-center hover:bg-gray-100 transition duration-300"
              >
                {action.icon}
                <span className="ml-2 text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div >
        {/* Detailed Insights */}
        < div className="grid md:grid-cols-2 gap-6" >
          {/* Age Distribution */}
          < div className="bg-white p-6 rounded-lg shadow" >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Member Age Distribution</h2>
            <div className="space-y-2">
              {Object.entries(data.memberAgeDistribution).map(([ageGroup, count]) => (
                <div key={ageGroup} className="flex items-center">
                  <div className="w-1/3 text-gray-600">{ageGroup} years</div>
                  <div className="flex-grow bg-blue-100 rounded-full h-4 mr-4">
                    <div
                      className="bg-blue-500 rounded-full h-4"
                      style={{ width: `${(count / data.totalMembers) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-gray-700 font-bold">{count}</div>
                </div>
              ))}
            </div>
          </div >

          {/* Membership Trends */}
          < div className="bg-white p-6 rounded-lg shadow" >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">New Members Trend</h2>
            <div className="flex space-x-2 h-48 items-end">
              {data.membershipTrends.map((trend, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="bg-green-500 w-full rounded-t-lg"
                    style={{ height: `${(trend.newMembers / 100) * 100}%` }}
                  ></div>
                  <span className="text-gray-600 mt-2">{trend.month}</span>
                </div>
              ))}
            </div>
          </div >
        </div >
      </div >
    </div >
  )
}

export default Dashboard