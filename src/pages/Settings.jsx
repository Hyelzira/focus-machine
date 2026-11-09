import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const navigate = useNavigate();
  
  const [soundLevel, setSoundLevel] = useState('Medium');
  const [shareAnalytics, setShareAnalytics] = useState(false);
  const [country, setCountry] = useState('United States');

  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    
    // Auto-switch direction for Arabic (RTL)
    if (newLang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // 1. Fully functional Clear Data button
  const handleClearData = () => {
    if(window.confirm("Are you sure? This will delete all your local progress and cannot be undone.")) {
      localStorage.removeItem('sessionHistory'); // Deletes progress history
      localStorage.removeItem('userType'); // Resets guest/member status
      alert("Local data cleared. Refresh the page to start fresh.");
    }
  };

  const soundOptions = ['Soft', 'Medium', 'Strong', 'Mute'];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-[#2C3E35] dark:text-gray-100 transition-colors duration-300 font-['Times_New_Roman',_Times,_serif]">
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t('settings.title')}</h1>
        <p className="text-[#607367] dark:text-gray-400 text-lg">{t('settings.subtitle')}</p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* 1. Appearance & Theme */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-[#E2DFD5] dark:border-gray-700 shadow-sm transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-4">{t('settings.appearance')}</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <strong className="block text-lg">{t('settings.darkMode')}</strong>
              <span className="text-base text-[#607367] dark:text-gray-400">{t('settings.darkModeSub')}</span>
            </div>
            
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                theme === 'dark' ? 'bg-[#4A7C59]' : 'bg-[#E2DFD5] dark:bg-gray-600'
              }`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* 2. Language & Region */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-[#E2DFD5] dark:border-gray-700 shadow-sm transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-6">{t('settings.langRegion')}</h2>
          
          <div className="flex flex-col gap-5">
            {/* Language Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <strong className="block text-lg">{t('settings.appLang')}</strong>
                <span className="text-base text-[#607367] dark:text-gray-400">{t('settings.appLangSub')}</span>
              </div>
              
              <select 
                value={i18n.language} 
                onChange={handleLanguageChange}
                className="bg-[#F5F2EB] dark:bg-gray-700 border border-[#E2DFD5] dark:border-gray-600 text-[#2C3E35] dark:text-white text-base rounded-xl focus:ring-[#4A7C59] focus:border-[#4A7C59] block w-full md:w-48 p-3 font-sans cursor-pointer outline-none transition-colors"
              >
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文 (Chinese)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>

            {/* Country Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-4 border-t border-[#F5F2EB] dark:border-gray-700">
              <div>
                <strong className="block text-lg">{t('settings.region')}</strong>
                <span className="text-base text-[#607367] dark:text-gray-400">{t('settings.regionSub')}</span>
              </div>
              <select 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                className="bg-[#F5F2EB] dark:bg-gray-700 border border-[#E2DFD5] dark:border-gray-600 text-[#2C3E35] dark:text-white text-base rounded-xl focus:ring-[#4A7C59] focus:border-[#4A7C59] block w-full md:w-48 p-3 font-sans cursor-pointer outline-none transition-colors"
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Nigeria</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Sound & Feedback */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-[#E2DFD5] dark:border-gray-700 shadow-sm transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-4">Sound & Feedback</h2>
          <p className="text-base text-[#607367] dark:text-gray-400 mb-5">The bell plays when a new set of symbols appears.</p>
          
          <div className="flex bg-[#F5F2EB] dark:bg-gray-700 p-1 rounded-xl w-full sm:w-fit font-sans">
            {soundOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSoundLevel(option)}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  soundLevel === option 
                    ? 'bg-white dark:bg-gray-600 text-[#4A7C59] dark:text-[#A3B18A] shadow-sm' 
                    : 'text-[#607367] dark:text-gray-400 hover:text-[#2C3E35] dark:hover:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Privacy, Data & Account */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-[#E2DFD5] dark:border-gray-700 shadow-sm transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-4">Privacy & Data</h2>
          
          <div className="flex items-center justify-between mb-5">
            <div>
              <strong className="block text-lg">Anonymous Analytics</strong>
              <span className="text-base text-[#607367] dark:text-gray-400">Help improve the app by sharing anonymous usage data.</span>
            </div>
            
            <button 
              onClick={() => setShareAnalytics(!shareAnalytics)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                shareAnalytics ? 'bg-[#4A7C59]' : 'bg-[#E2DFD5] dark:bg-gray-600'
              }`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                shareAnalytics ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#F5F2EB] dark:border-gray-700 font-sans">
            <button 
              onClick={handleLogout}
              className="text-sm font-bold text-[#4A7C59] dark:text-[#A3B18A] border border-[#4A7C59] dark:border-[#A3B18A] hover:bg-[#E8F0EA] dark:hover:bg-gray-700 px-4 py-2.5 rounded-xl transition-colors w-full sm:w-auto"
            >
              Log Out
            </button>

            <button 
              className="text-sm font-bold text-red-500 dark:text-red-400 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2.5 rounded-xl transition-colors w-full sm:w-auto"
              onClick={handleClearData}
            >
              Clear Local Data
            </button>
          </div>
        </div>

        {/* 5. About & Safety */}
        <div className="bg-[#E8F0EA] dark:bg-gray-800/50 rounded-3xl p-6 md:p-8 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-[#4A7C59] dark:text-[#A3B18A] mb-4">About</h2>
          
          <Link to="/safety" className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4 hover:shadow-md transition-all group border border-transparent dark:border-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-lg font-sans">🛡️</span>
              <span className="font-bold text-lg">Safety & Crisis Resources</span>
            </div>
            <span className="text-[#607367] dark:text-gray-400 group-hover:translate-x-1 transition-transform font-sans">→</span>
          </Link>
          
          <div className="text-base text-[#607367] dark:text-gray-400">
            <p className="mb-2"><strong>Focus Machine</strong> v1.0.0</p>
            <p className="leading-relaxed">
              Focus Machine is a training tool to practise attention and self-monitoring. 
              It does not diagnose, treat, or cure any medical or psychological condition.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;