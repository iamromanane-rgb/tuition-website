import React, { useState, useEffect } from 'react';
import { getSubmissions, markSubmissionAsRead, deleteSubmission } from '../api/apiClient';

const ManageSubmissions = ({ adminToken }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await getSubmissions(adminToken);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id, isRead) => {
    try {
      if (!isRead) {
        await markSubmissionAsRead(id, adminToken);
        setSubmissions(prev =>
          prev.map(sub => (sub._id === id ? { ...sub, isRead: true } : sub))
        );
      }
    } catch (error) {
      console.error('Error marking submission as read:', error);
      setError('Failed to update submission');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteSubmission(id, adminToken);
        setSubmissions(prev => prev.filter(sub => sub._id !== id));
      } catch (error) {
        console.error('Error deleting submission:', error);
        setError('Failed to delete submission');
      }
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'unread') return !sub.isRead;
    if (filter === 'read') return sub.isRead;
    return true;
  });

  const unreadCount = submissions.filter(sub => !sub.isRead).length;

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contact Submissions</h2>
        <p className="text-gray-600 mt-2">
          {submissions.length} total submissions
          {unreadCount > 0 && ` • ${unreadCount} unread`}
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-semibold border-b-4 transition-colors ${
            filter === 'all'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          All ({submissions.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 font-semibold border-b-4 transition-colors ${
            filter === 'unread'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 font-semibold border-b-4 transition-colors ${
            filter === 'read'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          Read ({submissions.filter(s => s.isRead).length})
        </button>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map(submission => (
          <div
            key={submission._id}
            className={`border-l-4 rounded-lg p-4 ${
              submission.isRead ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-600'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-800">{submission.name}</h3>
                  {!submission.isRead && (
                    <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  {submission.createdAt && new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                {!submission.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(submission._id, submission.isRead)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(submission._id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded p-3 mb-3 text-sm">
              <p className="text-gray-800">
                <span className="font-semibold">Email:</span> {submission.email}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Phone:</span> {submission.phoneNumber}
              </p>
            </div>

            {/* Interested Classes */}
            <div className="mb-3">
              <p className="text-gray-700 font-semibold text-sm mb-2">Interested Classes:</p>
              <div className="flex flex-wrap gap-2">
                {submission.interestedClasses.map((classId, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    {classId}
                  </span>
                ))}
              </div>
            </div>

            {/* Message */}
            {submission.message && (
              <div className="bg-white rounded p-3">
                <p className="text-gray-700 font-semibold text-sm mb-1">Message:</p>
                <p className="text-gray-700 text-sm">{submission.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No submissions found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default ManageSubmissions;
