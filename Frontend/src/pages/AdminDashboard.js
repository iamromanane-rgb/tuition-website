import React, { useState } from 'react';
import AdminPanel from '../components/AdminPanel';
import ManageClasses from '../components/ManageClasses';
import ManageSubmissions from '../components/ManageSubmissions';

const AdminDashboard = ({ adminToken, onLogout }) => {
  const [activeTab, setActiveTab] = useState('settings');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="flex border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white border-b-4 border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'classes'
                  ? 'bg-blue-600 text-white border-b-4 border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Manage Classes
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'submissions'
                  ? 'bg-blue-600 text-white border-b-4 border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Submissions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'settings' && <AdminPanel adminToken={adminToken} onLogout={onLogout} />}
          {activeTab === 'classes' && <ManageClasses adminToken={adminToken} />}
          {activeTab === 'submissions' && <ManageSubmissions adminToken={adminToken} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
