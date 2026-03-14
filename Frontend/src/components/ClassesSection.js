import React, { useState, useEffect } from 'react';
import { getClasses } from '../api/apiClient';

const ClassesSection = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('all');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await getClasses();
        setClasses(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching classes:', error);
        // Load sample data when API fails
        setClasses(getSampleClasses());
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const getSampleClasses = () => [
    {
      _id: '1',
      className: 'Class 1',
      subjectType: 'Hindi',
      level: 'L1',
      monthlyFee: 500,
      description: 'Foundation level Hindi for Class 1 students'
    },
    {
      _id: '2',
      className: 'Class 3',
      subjectType: 'Hindi',
      level: 'L2',
      monthlyFee: 600,
      description: 'Advanced Hindi curriculum for Class 3'
    },
    {
      _id: '3',
      className: 'Class 5',
      subjectType: 'Hindi',
      level: 'L2',
      monthlyFee: 700,
      description: 'Enhanced Hindi learning for Class 5'
    },
    {
      _id: '4',
      className: 'DBHPS Level 1',
      subjectType: 'Hindi',
      level: 'L1',
      monthlyFee: 800,
      description: 'Dhakshin Bharat Hindi Prachar Sabha exam preparation'
    },
    {
      _id: '5',
      className: 'DBHPS Level 2',
      subjectType: 'Hindi',
      level: 'L2',
      monthlyFee: 1000,
      description: 'Advanced DBHPS exam coaching'
    },
    {
      _id: '6',
      className: 'Tamil Class 1',
      subjectType: 'Tamil',
      level: 'L1',
      monthlyFee: 550,
      description: 'Beginner Tamil language learning'
    },
    {
      _id: '7',
      className: 'Tamil Class 2',
      subjectType: 'Tamil',
      level: 'L2',
      monthlyFee: 700,
      description: 'Intermediate Tamil language course'
    },
  ];

  const filteredClasses = selectedSubject === 'all'
    ? classes
    : classes.filter(cls => cls.subjectType === selectedSubject);

  if (loading) {
    return (
      <div className="min-h-96 bg-gradient-to-b from-slate-50 to-blue-50 flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 font-semibold">Loading our amazing classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-5xl font-bold mb-4 gradient-text">✨ Explore Our Classes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of Hindi and Tamil classes for all levels
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['all', 'Hindi', 'Tamil'].map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                selectedSubject === subject
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg animate-pulse-glow'
                  : 'bg-white text-blue-600 border-2 border-blue-600 hover:shadow-lg hover-lift'
              }`}
            >
              {subject === 'all' ? '📚 All Classes' : subject === 'Hindi' ? '🇮🇳 Hindi' : '🇮🇳 Tamil'}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((classItem, index) => (
            <div
              key={classItem._id}
              className="group relative bg-white rounded-2xl shadow-lg hover-lift card-shadow overflow-hidden border-t-4 border-blue-600 animate-slide-up transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10 p-6">
                {/* Icon */}
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {classItem.subjectType === 'Hindi' ? '🇮🇳' : '🇮🇳'}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {classItem.className}
                </h3>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">
                    {classItem.subjectType}
                  </span>
                  <span className="inline-block bg-gradient-to-r from-green-100 to-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-bold border border-green-200">
                    Level {classItem.level}
                  </span>
                </div>

                {classItem.description && (
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {classItem.description}
                  </p>
                )}

                {/* Price Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-gray-600 text-sm font-semibold mb-1 uppercase tracking-wider">Monthly Fee</p>
                  <p className="text-3xl font-bold text-blue-600">₹{classItem.monthlyFee}</p>
                  <p className="text-gray-500 text-xs mt-1">/month</p>
                </div>

                {/* CTA Button */}
                <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 rounded-xl transform group-hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                  🎯 Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 font-semibold">No classes found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassesSection;
