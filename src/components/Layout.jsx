import React, { useState } from 'react'; // 1. Imported useState
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackButton from './BackButton';
import SupportBot from './SupportBot';

const Layout = () => {
  const location = useLocation();
  
  // 2. State for the Crisis Modal
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  
  const hideNav = location.pathname === '/training' || location.pathname === '/complete';
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F5F2EB] dark:bg-gray-900 text-[#2C3E35] dark:text-gray-100 transition-colors duration-300 font-['Times_New_Roman',_Times,_serif]">
      
      {!hideNav && <Navbar />}

      <main className={`flex-1 flex flex-col w-full ${!hideNav ? 'pt-20' : ''}`}>
        <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8">
          
          {!isHomePage && !hideNav && (
            <div className="mt-4 md:mt-0 mb-2">
              <BackButton />
            </div>
          )}

          <Outlet />
        </div>
        
        {!hideNav && <Footer />}
      </main>

      {/* Add the Chatbot here, hidden during focus sessions */}
      {!hideNav && <SupportBot />}

      {/* 3. THE FLOATING CRISIS BUTTON & MODAL */}
      {/* We hide it during Training/Complete so it doesn't distract the user */}
      {!hideNav && (
        <>
          {/* The Floating Button (Bottom Left) */}
          <button 
            onClick={() => setShowCrisisModal(true)}
            className="fixed bottom-6 left-6 z-50 bg-white dark:bg-gray-800 border-2 border-[#E2DFD5] dark:border-gray-700 text-[#4A7C59] dark:text-[#A3B18A] w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
            title="Need immediate help?"
          >
            <span className="text-xl">🛡️</span>
          </button>

          {/* The Crisis Modal */}
          {showCrisisModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-[#E2DFD5] dark:border-gray-700 animate-in fade-in zoom-in duration-200">
                
                {/* Close Button */}
                <button 
                  onClick={() => setShowCrisisModal(false)}
                  className="absolute top-4 right-4 text-[#607367] hover:text-[#2C3E35] dark:text-gray-400 dark:hover:text-white font-sans text-lg"
                >
                  ✕
                </button>

                <div className="text-center">
                  <span className="text-4xl mb-4 block">🕊️</span>
                  <h2 className="text-2xl font-bold mb-2 text-[#2C3E35] dark:text-white">You are not alone.</h2>
                  <p className="text-[#607367] dark:text-gray-400 mb-6 text-sm">
                    If you are in distress or crisis, please reach out immediately. These services are free, confidential, and available 24/7.
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <a href="tel:988" className="bg-[#4A7C59] hover:bg-[#3D664A] text-white font-sans font-bold py-3 px-6 rounded-xl transition-colors">
                      📞 Call or Text 988 (US & Canada)
                    </a>
                    <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer" className="bg-[#F5F2EB] dark:bg-gray-700 text-[#4A7C59] dark:text-[#A3B18A] hover:bg-[#E2DFD5] dark:hover:bg-gray-600 font-sans font-bold py-3 px-6 rounded-xl transition-colors">
                      🌍 Find a Helpline (International)
                    </a>
                  </div>
                </div>

              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default Layout;