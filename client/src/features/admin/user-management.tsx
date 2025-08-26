import React from 'react';

const UserManagement: React.FC = () => {
  const users = [
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'User', status: 'Active' },
    { id: 3, name: 'Mike Johnson', role: 'Moderator', status: 'Inactive' }
  ];

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium mb-3">User Management Panel</h4>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-3 bg-white rounded border">
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">{user.role}</div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded ${
                user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {user.status}
              </span>
              <button className="text-blue-600 text-sm hover:underline">Edit</button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        👥 Admin-only feature with complex user management functionality.
      </p>
    </div>
  );
};

export default UserManagement;
