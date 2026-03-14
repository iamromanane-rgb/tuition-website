import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="group hover-lift">
            <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
              🎓 About Us
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Providing quality Hindi and Tamil tuition classes for students from Classes 1-9 and competitive exam preparation with 15+ years of experience.
            </p>
          </div>

          <div className="group hover-lift">
            <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
              📚 Our Programs
            </h3>
            <ul className="text-sm space-y-2 text-gray-400">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">✓ Classes 1-9 Hindi</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">✓ DBHPS Exam Preparation</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">✓ Tamil Language Courses</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">✓ Level 1 & 2 Classes</li>
            </ul>
          </div>

          <div className="group hover-lift">
            <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
              💰 Fee Structure
            </h3>
            <p className="text-sm text-gray-400 mb-2">
              Monthly fees range from <span className="font-bold text-blue-400">₹500 to ₹1000</span> depending on:
            </p>
            <ul className="text-sm space-y-1 text-gray-400">
              <li>• Class level (1-9)</li>
              <li>• Subject (Hindi/Tamil)</li>
              <li>• Level (L1/L2)</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 py-8 border-t border-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400 mb-2">15+</p>
            <p className="text-gray-400">Years of Experience</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400 mb-2">100+</p>
            <p className="text-gray-400">Happy Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400 mb-2">5+</p>
            <p className="text-gray-400">Languages & Programs</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            &copy; {currentYear} Hindi & Tamil Tuition Classes. All rights reserved. | Built with ❤️
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <span className="hover:text-blue-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-gray-600">•</span>
            <span className="hover:text-blue-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="text-gray-600">•</span>
            <span className="hover:text-blue-400 transition-colors cursor-pointer">Contact Us</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
