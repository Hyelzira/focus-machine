import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-800 border-t border-[#E2DFD5] dark:border-gray-700 py-12 px-6 mt-auto transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Top Section: Brand & Message */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 text-[#4A7C59] dark:text-[#A3B18A] font-bold text-xl mb-4">
              <img src={logoImg} alt="Focus Machine Logo" className="w-10 h-10" />
              Focus Machine
            </Link>
            <p className="text-sm text-[#607367] dark:text-gray-400 leading-relaxed">
              A quiet space to practise attention, understand your feelings, and notice your progress over time.
            </p>
            <p className="text-sm font-bold text-[#4A7C59] dark:text-[#A3B18A] mt-4">
              Small steps. Steadier attention.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-[#2C3E35] dark:text-gray-100 mb-1">Explore</h4>
              <Link to="/" className="text-sm text-[#607367] dark:text-gray-400 hover:text-[#4A7C59] dark:hover:text-[#A3B18A] transition-colors">Home</Link>
              <Link to="/checkin" className="text-sm text-[#607367] dark:text-gray-400 hover:text-[#4A7C59] dark:hover:text-[#A3B18A] transition-colors">Focus Session</Link>
              <Link to="/progress" className="text-sm text-[#607367] dark:text-gray-400 hover:text-[#4A7C59] dark:hover:text-[#A3B18A] transition-colors">Your Progress</Link>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-[#2C3E35] dark:text-gray-100 mb-1">Information</h4>
              <Link to="/settings" className="text-sm text-[#607367] dark:text-gray-400 hover:text-[#4A7C59] dark:hover:text-[#A3B18A] transition-colors">Settings</Link>
              <Link to="/safety" className="text-sm text-[#607367] dark:text-gray-400 hover:text-[#4A7C59] dark:hover:text-[#A3B18A] transition-colors">Safety & Help</Link>
              <Link to="/safety" className="text-sm text-[#607367] dark:text-gray-400 hover:text-[#4A7C59] dark:hover:text-[#A3B18A] transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[#E2DFD5] dark:border-gray-700" />

        {/* Middle Section: Gentle Reminder */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-[#4A7C59] dark:text-[#A3B18A] text-xl">♡</span>
          <p className="text-sm font-semibold text-[#2C3E35] dark:text-gray-200">
            Your attention is worth practising. Progress does not need to be perfect to be meaningful.
          </p>
        </div>

        {/* Bottom Section: Disclaimer & Copyright */}
        <div className="flex flex-col gap-4 text-xs text-[#7E8F84] dark:text-gray-500 text-center md:text-left">
          <p>
            <strong className="text-[#607367] dark:text-gray-400">A gentle reminder:</strong> Focus Machine is a training tool to practise attention and self-monitoring. It does not diagnose, treat, or cure depression, anxiety, high blood pressure, or any medical or psychological condition. If you are in significant distress or crisis, please contact a qualified professional or local emergency services.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-4 border-t border-[#E2DFD5] dark:border-gray-700 mt-2">
            <p>© {new Date().getFullYear()} Focus Machine. All rights reserved.</p>
            <p>Designed for calm, accessible attention training.</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;