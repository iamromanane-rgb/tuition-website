import React, { useState, useEffect } from 'react';
import { getAdminInfo, updateAdminInfo } from '../api/apiClient';

const AdminPanel = ({ adminToken, onLogout }) => {
  const [adminInfo, setAdminInfo] = useState({
    phoneNumber: '',
    emailAddress: '',
    yearsOfExperience: 15,
    aboutText: '',
    qualifications: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await getAdminInfo();
        setAdminInfo(response.data);
      } catch (error) {
        console.error('Error fetching admin info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo(prev => ({
      ...prev,
      [name]: name === 'yearsOfExperience' ? parseInt(value) : value
    }));
  };

  const handleQualificationsChange = (e) => {
    const qualifications = e.target.value.split('\n').filter(q => q.trim());
    setAdminInfo(prev => ({
      ...prev,
      qualifications
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const response = await updateAdminInfo(adminInfo, adminToken);
      setMessage('Admin information updated successfully!');
      setAdminInfo(response.data.adminInfo);
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Error updating admin info:', error);
      setError('Failed to update admin information');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Settings</h2>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      {message && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={adminInfo.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            required
          />
          <p className="text-sm text-gray-600 mt-1">This will be displayed on the website</p>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="emailAddress"
            value={adminInfo.emailAddress}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            required
          />
          <p className="text-sm text-gray-600 mt-1">This will be displayed on the website</p>
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            name="yearsOfExperience"
            value={adminInfo.yearsOfExperience}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            min="0"
          />
        </div>

        {/* About Text */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            About Text
          </label>
          <textarea
            name="aboutText"
            value={adminInfo.aboutText}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Qualifications */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Qualifications (One per line)
          </label>
          <textarea
            value={adminInfo.qualifications.join('\n')}
            onChange={handleQualificationsChange}
            rows="4"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Masters in Hindi&#10;B.A. in Languages&#10;Teaching Certification"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
