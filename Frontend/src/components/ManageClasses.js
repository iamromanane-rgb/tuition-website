import React, { useState, useEffect } from 'react';
import { getClasses, createClass, updateClass, deleteClass } from '../api/apiClient';

const ManageClasses = ({ adminToken }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    className: '',
    subjectType: 'Hindi',
    level: 'L1',
    monthlyFee: 500,
    description: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const classOptions = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9',
    'DBHPS Level 1', 'DBHPS Level 2',
    'Tamil Class 1', 'Tamil Class 2', 'Tamil Class 3'
  ];

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await getClasses();
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setError('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'monthlyFee' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!formData.className || !formData.monthlyFee) {
      setError('Please fill all required fields');
      return;
    }

    try {
      if (editingId) {
        await updateClass(editingId, formData, adminToken);
        setMessage('Class updated successfully!');
      } else {
        await createClass(formData, adminToken);
        setMessage('Class created successfully!');
      }

      setFormData({
        className: '',
        subjectType: 'Hindi',
        level: 'L1',
        monthlyFee: 500,
        description: ''
      });
      setEditingId(null);
      fetchClasses();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving class:', error);
      setError('Failed to save class');
    }
  };

  const handleEdit = (classItem) => {
    setFormData({
      className: classItem.className,
      subjectType: classItem.subjectType,
      level: classItem.level,
      monthlyFee: classItem.monthlyFee,
      description: classItem.description
    });
    setEditingId(classItem._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await deleteClass(id, adminToken);
        setMessage('Class deleted successfully!');
        fetchClasses();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting class:', error);
        setError('Failed to delete class');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      className: '',
      subjectType: 'Hindi',
      level: 'L1',
      monthlyFee: 500,
      description: ''
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Add/Edit Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editingId ? 'Edit Class' : 'Add New Class'}
        </h2>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Class Name *
              </label>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                required
              >
                <option value="">Select a class</option>
                {classOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Subject Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Subject Type *
              </label>
              <select
                name="subjectType"
                value={formData.subjectType}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              >
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Level *
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              >
                <option value="L1">L1</option>
                <option value="L2">L2</option>
              </select>
            </div>

            {/* Monthly Fee */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Monthly Fee (₹) *
              </label>
              <input
                type="number"
                name="monthlyFee"
                value={formData.monthlyFee}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                min="500"
                max="1000"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors"
            >
              {editingId ? 'Update Class' : 'Add Class'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Classes List */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Classes List</h2>

        <div className="space-y-4">
          {classes.map(classItem => (
            <div key={classItem._id} className="border-2 border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{classItem.className}</h3>
                  <p className="text-gray-600 mt-1">
                    <span className="font-semibold">{classItem.subjectType}</span> - {classItem.level}
                  </p>
                  <p className="text-gray-600">
                    Fee: <span className="font-semibold">₹{classItem.monthlyFee}/month</span>
                  </p>
                  {classItem.description && (
                    <p className="text-gray-600 mt-2">{classItem.description}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(classItem)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(classItem._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {classes.length === 0 && (
          <p className="text-center text-gray-600">No classes found. Create your first class!</p>
        )}
      </div>
    </div>
  );
};

export default ManageClasses;
