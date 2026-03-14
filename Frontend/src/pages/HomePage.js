import React from 'react';
import Header from '../components/Header';
import ClassesSection from '../components/ClassesSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      {/* About Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-5xl font-bold mb-4 gradient-text">
              ✨ Why Choose Our Classes?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience quality education from a dedicated and experienced instructor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎓',
                title: 'Experienced Instructor',
                description: 'With 15+ years of teaching experience in Hindi and Tamil languages, ensuring quality education and proven results.'
              },
              {
                icon: '📚',
                title: 'Comprehensive Curriculum',
                description: 'Classes 1-9, DBHPS exam preparation, and Tamil language courses designed for all levels and learning styles.'
              },
              {
                icon: '💻',
                title: 'Online Flexibility',
                description: 'Flexible online classes that fit your schedule. Learn from the comfort of your home with interactive sessions.'
              },
              {
                icon: '🎯',
                title: 'Personalized Learning',
                description: 'Customized teaching approach for each student ensuring maximum understanding and better retention.'
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                description: 'Regular assessments and detailed progress reports to monitor your learning journey and improvement.'
              },
              {
                icon: '🌟',
                title: 'Quality Support',
                description: 'Dedicated support and guidance throughout your learning journey with affordable fees.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover-lift card-shadow border border-blue-100 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '100+', label: 'Happy Students' },
              { number: '9', label: 'Class Levels' },
              { number: '2', label: 'Languages' }
            ].map((stat, idx) => (
              <div key={idx} className="transform hover:scale-110 transition-transform">
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-blue-100 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClassesSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default HomePage;
