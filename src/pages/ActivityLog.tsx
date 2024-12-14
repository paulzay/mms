import { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Clock,
  User,
  Activity,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Save,
  X
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';


// Sample activity data structure
const sampleActivities = [
  {
    id: 1,
    timestamp: '2024-03-15T10:30:00Z',
    user: 'John Doe',
    type: 'file_upload',
    description: 'Uploaded quarterly report',
    status: 'success'
  },
  {
    id: 2,
    timestamp: '2024-03-15T11:45:00Z',
    user: 'Jane Smith',
    type: 'login',
    description: 'Logged in from new device',
    status: 'warning'
  },
  {
    id: 3,
    timestamp: '2024-03-15T14:20:00Z',
    user: 'Mike Johnson',
    type: 'document_edit',
    description: 'Modified project proposal',
    status: 'success'
  },
  {
    id: 4,
    timestamp: '2024-03-15T15:10:00Z',
    user: 'Emily Wong',
    type: 'permission_change',
    description: 'Updated team access rights',
    status: 'alert'
  }
];

// Icons for different activity types
const activityIcons = {
  file_upload: FileText,
  login: User,
  document_edit: Activity,
  permission_change: AlertTriangle
};

// Status color and icon mapping
const statusStyles = {
  success: {
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  alert: {
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }
};

const ActivityLog = () => {
  const user = useSelector((state: RootState) => state.user.user) as unknown as { id?: string };
  const [activities, setActivities] = useState(sampleActivities);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newActivity, setNewActivity] = useState({
    user: user.id || '',
    type: 'file_upload',
    description: '',
    status: 'success'
  });

  // Format timestamp to readable date
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter activities based on status
  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(activity => activity.status === filter);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit new activity
  const handleSubmit = (e) => {
    e.preventDefault();

    const activityToAdd = {
      ...newActivity,
      id: activities.length + 1,
      timestamp: new Date().toISOString()
    };

    setActivities(prev => [activityToAdd, ...prev]);

    // Reset form and close modal
    setNewActivity({
      user: user.id || '',
      type: 'file_upload',
      description: '',
      status: 'success'
    });
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className='bg-white p-4 rounded-lg shadow p-6'>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2>Activity Log</h2>
            <div className="flex space-x-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="all">All Activities</option>
                <option value="success">Successful</option>
                <option value="warning">Warnings</option>
                <option value="alert">Alerts</option>
              </select>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded flex items-center hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Log
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="divide-y">
            {filteredActivities.map((activity) => {
              const ActivityIcon = activityIcons[activity.type] || Activity;
              const StatusInfo = statusStyles[activity.status] || statusStyles.success;

              return (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-full ${StatusInfo.bgColor}`}>
                    <ActivityIcon className={`w-6 h-6 ${StatusInfo.color}`} />
                  </div>

                  <div className="flex-grow">
                    <div className="font-medium">{activity.description}</div>
                    <div className="text-sm text-gray-500">
                      <span className="mr-2">{activity.user}</span>
                      <Clock className="inline-block w-4 h-4 mr-1" />
                      {formatTimestamp(activity.timestamp)}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${StatusInfo.bgColor} ${StatusInfo.color}`}>
                    {activity.status}
                  </div>
                </div>
              );
            })}

            {filteredActivities.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No activities found
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Log Entry</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-transparent text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* <div>
                <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">
                  User
                </label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={newActivity.user}
                  onChange={handleInputChange}
                  required
                  disabled
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter user name"
                />
              </div> */}

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newActivity.type}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="file_upload">File Upload</option>
                  <option value="login">Login</option>
                  <option value="document_edit">Document Edit</option>
                  <option value="permission_change">Permission Change</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newActivity.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter activity description"
                ></textarea>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newActivity.status}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="alert">Alert</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" /> Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;