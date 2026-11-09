import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import calmVideo from '../assets/grassland.mp4'; 
import footerVideo from '../assets/waves.mp4';

const Home = () => {
  const { t } = useTranslation();

  const moods = [
    { label: 'Very Low', face: '😌' },
    { label: 'Low', face: '🙂' },
    { label: 'Neutral', face: '😐' },
    { label: 'High', face: '😟' },
    { label: 'Very High', face: '😣' },
  ];

  return (
    <div className="w-full flex flex-col bg-[#FAF9F6] dark:bg-gray-900 text-[#2C3E35] dark:text-gray-100 font-['Times_New_Roman',_Times,_serif]">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={calmVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-black/30"></div>
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto w-full">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-[1.15] tracking-tight drop-shadow-md">
            {t('home.heroTitle')}
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed font-light max-w-2xl mx-auto drop-shadow-sm">
            {t('home.heroSub')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center font-sans">
            <Link to="/checkin" className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-[#2C3E35] font-semibold py-4 px-10 rounded-full shadow-lg transition-all hover:-translate-y-0.5 text-lg">
              {t('home.startBtn')}
            </Link>
            <Link to="/progress" className="inline-flex items-center justify-center bg-transparent border-2 border-white/70 hover:bg-white/10 text-white font-semibold py-4 px-10 rounded-full transition-all text-lg">
              {t('home.viewProgressBtn')}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL INTRODUCTION */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <span className="text-xs font-bold text-[#4A7C59] dark:text-[#A3B18A] uppercase tracking-widest mb-4 block font-sans">
          Your Daily Practice
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-[#2C3E35] dark:text-white">
          {t('home.introTitle')}
        </h2>
        <p className="text-[#607367] dark:text-gray-400 text-lg leading-relaxed">
          {t('home.introSub')}
        </p>
      </section>

      {/* 3. THE QUIET CHECK-IN */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-[#E2DFD5] dark:border-gray-700 text-center">
            <h3 className="text-2xl font-bold mb-2">{t('home.checkinTitle')}</h3>
            <p className="text-[#607367] dark:text-gray-400 text-base mb-10">{t('home.checkinSub')}</p>
            <div className="flex justify-center gap-4 sm:gap-8 mb-12">
              {moods.map((mood, i) => (
                <Link key={i} to="/checkin" className="group flex flex-col items-center gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-[#F5F2EB] dark:bg-gray-700 border border-[#E2DFD5] dark:border-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                    <span className="text-3xl sm:text-4xl">{mood.face}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#607367] dark:text-gray-400 text-center uppercase tracking-wide font-sans">
                    {mood.label}
                  </span>
                </Link>
              ))}
            </div>
            <div className="inline-flex items-center gap-6 bg-[#F5F2EB] dark:bg-gray-700/50 rounded-2xl px-6 py-4 text-left">
              <div className="relative w-12 h-12">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#E2DFD5" strokeWidth="3" className="dark:stroke-gray-600" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#4A7C59" strokeWidth="3" strokeDasharray="70, 100" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#4A7C59] dark:text-[#A3B18A] font-sans">7/10</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#607367] dark:text-gray-400 uppercase tracking-wider font-semibold font-sans">{t('home.recentSession')}</p>
                <p className="text-lg font-bold text-[#2C3E35] dark:text-white">{t('home.steady')}</p>
              </div>
              <Link to="/progress" className="ml-4 text-sm font-semibold text-[#4A7C59] dark:text-[#A3B18A] hover:underline whitespace-nowrap">
                Details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SPA-INSPIRED FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-sm">
            <img src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=600" alt="Calm meditation space" className="w-full h-72 object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{t('home.quietTitle')}</h2>
            <p className="text-[#607367] dark:text-gray-400 mb-6 text-base leading-relaxed">
              {t('home.quietSub')}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-base text-[#2C3E35] dark:text-gray-200">
                <span className="text-[#4A7C59] dark:text-[#A3B18A]">•</span> Self-paced sessions — no forced time limits
              </li>
              <li className="flex items-start gap-3 text-base text-[#2C3E35] dark:text-gray-200">
                <span className="text-[#4A7C59] dark:text-[#A3B18A]">•</span> Gentle, non-shaming feedback
              </li>
              <li className="flex items-start gap-3 text-base text-[#2C3E35] dark:text-gray-200">
                <span className="text-[#4A7C59] dark:text-[#A3B18A]">•</span> Local-first privacy — your data stays with you
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. QUOTE BLOCK */}
      <section className="bg-[#E8F0EA] dark:bg-gray-800 py-16 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-3xl font-medium text-[#4A7C59] dark:text-[#A3B18A] italic leading-relaxed mb-4">
            "Progress isn't about perfection, it's about showing up."
          </p>
        </div>
      </section>

      {/* 6. FULL-WIDTH CTA & VIDEO BLEND */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[500px] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={footerVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-black/50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-t from-gray-900 to-transparent"></div>

        <div className="relative z-20 text-center px-6 max-w-2xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">{t('home.readyTitle')}</h2>
          <p className="text-white/90 mb-8 text-xl font-light drop-shadow-sm max-w-md mx-auto">
            {t('home.readySub')}
          </p>
          <Link to="/checkin" className="inline-block bg-[#4A7C59] hover:bg-[#3D664A] text-white font-sans font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:-translate-y-0.5 text-lg">
            {t('home.readyBtn')}
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;