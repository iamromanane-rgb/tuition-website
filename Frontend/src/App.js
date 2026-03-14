import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!tokenInput.trim()) {
      setLoginError('Please enter admin token');
      return;
    }

    // Store token and set it
    localStorage.setItem('adminToken', tokenInput);
    setAdminToken(tokenInput);
    setTokenInput('');
    setShowAdminLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
    setTokenInput('');
    setLoginError('');
  };

  // If logged in as admin, show admin dashboard
  if (adminToken) {
    return <AdminDashboard adminToken={adminToken} onLogout={handleLogout} />;
  }

  // Show home page with admin login option
  return (
    <div>
      <HomePage />

      {/* Floating Admin Button */}
      <button
        onClick={() => setShowAdminLogin(!showAdminLogin)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 duration-300 text-3xl border-4 border-blue-500 animate-pulse-glow z-40"
        title="Admin Login"
      >
        ⚙️
      </button>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-slide-up">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-blue-200 transform animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold gradient-text">🔐 Admin Login</h2>
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setLoginError('');
                  setTokenInput('');
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {loginError && (
              <div className="mb-6 bg-gradient-to-r from-red-100 to-pink-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg animate-slide-up">
                <p className="font-bold">⚠️ {loginError}</p>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  🔑 Admin Token
                </label>
                <input
                  type="password"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="w-full px-5 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50 hover:bg-white"
                  placeholder="Enter your secret token"
                  autoFocus
                />
              </div>

              <p className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                💡 Tip: Check your .env file for the admin token
              </p>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setLoginError('');
                    setTokenInput('');
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
