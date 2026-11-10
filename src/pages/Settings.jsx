import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const navigate = useNavigate();
  
  // Load saved preferences from localStorage on mount
  const [soundLevel, setSoundLevel] = useState(localStorage.getItem('soundLevel') || 'Medium');
  const [shareAnalytics, setShareAnalytics] = useState(false);
  const [country, setCountry] = useState('United States');
  const [gentleMode, setGentleMode] = useState(localStorage.getItem('gentleMode') === 'true');
  const [symbolStyle, setSymbolStyle] = useState(localStorage.getItem('symbolStyle') || 'mahjong');

  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);

  // Save preferences to localStorage when they change
  useEffect(() => { localStorage.setItem('soundLevel', soundLevel); }, [soundLevel]);
  useEffect(() => { localStorage.setItem('gentleMode', gentleMode.toString()); }, [gentleMode]);
  useEffect(() => { localStorage.setItem('symbolStyle', symbolStyle); }, [symbolStyle]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
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

  const handleClearData = () => {
    if(window.confirm("Are you sure? This will delete all your local progress and cannot be undone.")) {
      localStorage.removeItem('sessionHistory'); 
      localStorage.removeItem('userType'); 
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

        {/* 3. NEW: Practice Mode (Gentle Start & Symbol Style) */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-[#E2DFD5] dark:border-gray-700 shadow-sm transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-6">Practice Mode</h2>
          
          <div className="flex flex-col gap-6">
            {/* Gentle Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <strong className="block text-lg">Very Gentle Start</strong>
                <span className="text-base text-[#607367] dark:text-gray-400">Slower symbol changes (8s) and more forgiving rules.</span>
              </div>
              <button 
                onClick={() => setGentleMode(!gentleMode)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                  gentleMode ? 'bg-[#4A7C59]' : 'bg-[#E2DFD5] dark:bg-gray-600'
                }`}
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  gentleMode ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Symbol Style Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-4 border-t border-[#F5F2EB] dark:border-gray-700">
              <div>
                <strong className="block text-lg">Symbol Style</strong>
                <span className="text-base text-[#607367] dark:text-gray-400">Choose your preferred visual training style.</span>
              </div>
              <div className="flex bg-[#F5F2EB] dark:bg-gray-700 p-1 rounded-xl font-sans">
                <button
                  onClick={() => setSymbolStyle('mahjong')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    symbolStyle === 'mahjong' ? 'bg-white dark:bg-gray-600 text-[#4A7C59] shadow-sm' : 'text-[#607367]'
                  }`}
                >
                  Mahjong
                </button>
                <button
                  onClick={() => setSymbolStyle('geometric')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    symbolStyle === 'geometric' ? 'bg-white dark:bg-gray-600 text-[#4A7C59] shadow-sm' : 'text-[#607367]'
                  }`}
                >
                  Geometric
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Sound & Feedback */}
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

        {/* 5. NEW: Transparency & Science Screen */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-[#E2DFD5] dark:border-gray-700 shadow-sm transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-4">How is Focus Level calculated?</h2>
          <p className="text-base text-[#607367] dark:text-gray-400 mb-4">
            We believe in transparency. Your Focus Level (1-10) is a weighted combination of three components:
          </p>
          <ul className="space-y-3 text-[#2C3E35] dark:text-gray-200 font-sans text-base">
            <li className="flex justify-between border-b border-[#F5F2EB] dark:border-gray-700 pb-2">
              <span>Accuracy (Correct matches)</span>
              <span className="font-bold">45%</span>
            </li>
            <li className="flex justify-between border-b border-[#F5F2EB] dark:border-gray-700 pb-2">
              <span>Consistency (Steady response times)</span>
              <span className="font-bold">30%</span>
            </li>
            <li className="flex justify-between">
              <span>Duration (Time practised, capped at 7 mins)</span>
              <span className="font-bold">25%</span>
            </li>
          </ul>
          <p className="text-sm text-[#607367] dark:text-gray-500 mt-4 italic">
            Note: If you complete fewer than 5 trials, the Focus Level is capped at 4 to ensure data accuracy. This tool trains selective attention, sustained attention, and the value of noticing your internal state without trying to fix it.
          </p>
        </div>

        {/* 6. Privacy & Data */}
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

        {/* 7. About & Safety */}
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