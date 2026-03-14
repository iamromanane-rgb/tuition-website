import React, { useState, useEffect } from 'react';
import { getAdminInfo } from '../api/apiClient';

const Header = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await getAdminInfo();
        setAdminInfo(response.data);
      } catch (error) {
        console.error('Error fetching admin info:', error);
        // Set fallback data
        setAdminInfo({
          phoneNumber: '+91-XXXXXXXXXX',
          emailAddress: 'your.email@example.com'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminInfo();
  }, []);

  const handleWhatsApp = () => {
    if (adminInfo?.phoneNumber) {
      const phone = adminInfo.phoneNumber.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${phone}`, '_blank');
    }
  };

  const handleEmail = () => {
    if (adminInfo?.emailAddress) {
      window.location.href = `mailto:${adminInfo.emailAddress}`;
    }
  };

  const handleCall = () => {
    if (adminInfo?.phoneNumber) {
      const phone = adminInfo.phoneNumber.replace(/[^0-9]/g, '');
      window.location.href = `tel:+${phone}`;
    }
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="text-sm font-semibold flex items-center gap-2">
            <span>📞 Quick Contact:</span>
            <span className="font-mono">{!loading && adminInfo ? adminInfo.phoneNumber : 'Loading...'}</span>
          </div>

          {/* Contact Icons */}
          <div className="flex gap-3 items-center">
            {/* Phone Icon */}
            <button
              onClick={handleCall}
              className="contact-icon phone-icon hover-lift"
              title="Call us"
              aria-label="Call"
            >
              ☎️
            </button>

            {/* WhatsApp Icon */}
            <button
              onClick={handleWhatsApp}
              className="contact-icon whatsapp-icon hover-lift"
              title="Chat on WhatsApp"
              aria-label="WhatsApp"
            >
              💬
            </button>

            {/* Email Icon */}
            <button
              onClick={handleEmail}
              className="contact-icon email-icon hover-lift"
              title="Send Email"
              aria-label="Email"
            >
              ✉️
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-2 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 gradient-text drop-shadow-lg">
              🎓 Hindi & Tamil Tuition Classes
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6 font-light drop-shadow">
              Learn from an Experienced Instructor with 15+ Years of Excellence
            </p>
          </div>

          {!loading && adminInfo && (
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 inline-block border border-white/20 hover-lift card-shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📱</span>
                  <div>
                    <p className="text-xs font-semibold text-blue-100 uppercase tracking-wider">Phone</p>
                    <p className="text-lg font-bold">{adminInfo.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl">📧</span>
                  <div>
                    <p className="text-xs font-semibold text-blue-100 uppercase tracking-wider">Email</p>
                    <p className="text-lg font-bold truncate">{adminInfo.emailAddress}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl">⭐</span>
                  <div>
                    <p className="text-xs font-semibold text-blue-100 uppercase tracking-wider">Experience</p>
                    <p className="text-lg font-bold">{adminInfo.yearsOfExperience}+ Years</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
