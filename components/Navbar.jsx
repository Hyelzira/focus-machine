import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const { t } = useTranslation();
  
  const location = useLocation();

  const [isGuest, setIsGuest] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem('userType') === 'guest') {
      setIsGuest(true);
    } else {
      setIsGuest(false);
    }
  }, [location.pathname]);

  const desktopLinks = [
    { label: t('nav.home'), path: '/', end: true },
    { label: 'About', path: '/about' },
    { label: t('nav.progress'), path: '/progress' },
  ];

  const mobileOnlyLinks = [
    { label: t('nav.settings'), path: '/settings' },
    { label: t('nav.safety'), path: '/safety' },
  ];

  return (
    <>
      {/* Added font-['Times_New_Roman',_Times,_serif] to the header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-[#E2DFD5] dark:border-gray-700 transition-colors duration-300 font-['Times_New_Roman',_Times,_serif]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-20">
          
          {/* Brand & Logo */}
          <Link to="/" className="flex items-center gap-3 text-[#4A7C59] dark:text-[#A3B18A] hover:opacity-80 transition-opacity z-50" onClick={closeMenu}>
           <img src={logoImg} alt="Focus Machine Logo" className="w-8 h-8 object-contain" />
            <span className="flex flex-col">
              {/* Increased to text-2xl to compensate for Times New Roman being smaller */}
              <strong className="text-2xl font-bold text-[#2C3E35] dark:text-white leading-tight tracking-tight ml-1">Focus Machine</strong>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {desktopLinks.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                end={item.end} 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full font-bold text-base transition-colors ${
                    isActive 
                      ? "bg-[#E8F0EA] text-[#4A7C59] dark:bg-gray-700 dark:text-[#A3B18A]" 
                      : "text-[#607367] dark:text-gray-400 hover:text-[#2C3E35] dark:hover:text-white hover:bg-[#F5F2EB] dark:hover:bg-gray-700/50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Container */}
          <div className="flex items-center gap-3 z-50">
            
            {/* Guest Sign Up Button (Desktop) */}
            {isGuest && (
              <Link to="/login" className="hidden md:flex items-center justify-center bg-transparent border border-[#4A7C59] dark:border-[#A3B18A] text-[#4A7C59] dark:text-[#A3B18A] hover:bg-[#E8F0EA] dark:hover:bg-gray-700 font-bold py-2 px-6 rounded-full transition-colors text-base">
                Sign Up
              </Link>
            )}

            {/* Start Session Button */}
            <Link to="/checkin" className="hidden md:flex items-center justify-center bg-[#4A7C59] hover:bg-[#3D664A] text-white font-bold py-2 px-6 rounded-full shadow-sm transition-colors text-base">
              Start a session
            </Link>

            {/* Mobile Hamburger */}
            <button type="button" className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span className={`block w-6 h-0.5 bg-[#2C3E35] dark:bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#2C3E35] dark:bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#2C3E35] dark:bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY & DRAWER */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-black/60 z-[60] transition-opacity" onClick={closeMenu} />
      )}

      {/* Added font-['Times_New_Roman',_Times,_serif] to the drawer */}
      <div className={`md:hidden fixed inset-y-0 right-0 w-72 bg-white dark:bg-gray-800 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out font-['Times_New_Roman',_Times,_serif] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-20 border-b border-[#E2DFD5] dark:border-gray-700 flex items-center justify-end px-6">
           {/* Kept the close icon in sans-serif so it doesn't look like a letter 'x' */}
           <button onClick={closeMenu} className="text-2xl font-sans text-[#607367] dark:text-gray-400 hover:text-[#2C3E35] dark:hover:text-white p-2">
             ✕
           </button>
        </div>
        
        <nav className="flex flex-col p-6 gap-2">
          {desktopLinks.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              end={item.end} 
              onClick={closeMenu} 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-xl font-bold text-lg transition-colors ${
                  isActive 
                    ? "bg-[#E8F0EA] text-[#4A7C59] dark:bg-gray-700 dark:text-[#A3B18A]" 
                    : "text-[#607367] dark:text-gray-400 hover:bg-[#F5F2EB] dark:hover:bg-gray-700/50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {mobileOnlyLinks.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              end={item.end} 
              onClick={closeMenu} 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-xl font-bold text-lg transition-colors ${
                  isActive 
                    ? "bg-[#E8F0EA] text-[#4A7C59] dark:bg-gray-700 dark:text-[#A3B18A]" 
                    : "text-[#607367] dark:text-gray-400 hover:bg-[#F5F2EB] dark:hover:bg-gray-700/50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {isGuest && (
            <Link to="/login" onClick={closeMenu} className="mt-4 text-center bg-transparent border-2 border-[#4A7C59] dark:border-[#A3B18A] text-[#4A7C59] dark:text-[#A3B18A] font-bold py-3 px-6 rounded-xl transition-colors text-lg">
              Create an Account
            </Link>
          )}

          <Link to="/checkin" onClick={closeMenu} className="mt-2 text-center bg-[#4A7C59] hover:bg-[#3D664A] text-white font-bold py-3 px-6 rounded-xl shadow-sm transition-colors text-lg">
            Start a session
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;