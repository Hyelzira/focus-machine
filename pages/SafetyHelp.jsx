import React from 'react';

const SafetyHelp = () => {
  return (
    // 1. A soft, warm gradient background (Sunset vibe)
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF4E5] via-[#F5F2EB] to-[#F5F2EB] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 md:px-5 transition-colors duration-300">
      
      <div className="max-w-3xl mx-auto text-[#2C3E35] dark:text-gray-100">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-4xl mb-2">🕊️</div>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-3">Safety & Help</h1>
          <p className="text-[#607367] dark:text-gray-400 text-lg">
            Your well-being is the priority. You are not alone.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          
          {/* Mandatory Disclaimer */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-[#E8DCC8] dark:border-yellow-700/50 rounded-[2rem] p-5 md:p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#8C6B32] dark:text-yellow-500 mb-2 flex items-center gap-2">
              <span>⚠️</span> Important Disclaimer
            </h3>
            <p className="text-[#5C4A32] dark:text-yellow-100/80 leading-relaxed text-[12px]">
              Focus Machine is a training tool to practise attention and self-monitoring. 
              It does <strong className="font-bold">not</strong> diagnose, treat, or cure depression, anxiety, high blood pressure, 
              or any medical or psychological condition. If you are in significant distress or crisis, 
              please contact a qualified professional or local emergency services.
            </p>
          </div>

          {/* Crisis Resources */}
          <div className="bg-white/90 dark:bg-gray-800 rounded-[2rem] p-5 md:p-6 border border-[#E2DFD5] dark:border-gray-700 shadow-md">
            <h3 className="text-xl font-bold mb-2">Need to talk to someone right now?</h3>
            <p className="text-[#607367] dark:text-gray-400 text-sm mb-6">
              If you are feeling overwhelmed or in crisis, please reach out. These services are free, confidential, and available 24/7.
            </p>
            
            <div className="flex flex-col gap-4">
              
              {/* Primary Resource (112) */}
              <a 
                href="tel:112" 
                className="flex items-center gap-5 bg-[#E8F0EA] dark:bg-gray-700 border-2 border-[#4A7C59] dark:border-[#A3B18A] p-5 rounded-2xl hover:scale-[1.02] hover:shadow-md transition-all group"
              >
                <span className="text-3xl group-hover:rotate-12 transition-transform">📞</span>
                <div className="flex flex-col">
                  <strong className="text-[#2C3E35] dark:text-white text-xl">Call or Text 112</strong>
                  <span className="text-[#607367] dark:text-gray-300 text-sm font-medium">Emergency Services (International)</span>
                </div>
              </a>

              {/* Secondary Resource */}
              <a 
                href="https://findahelpline.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 bg-[#F5F2EB] dark:bg-gray-700/50 p-5 rounded-2xl hover:bg-[#E2DFD5] dark:hover:bg-gray-700 transition-colors group"
              >
                <span className="text-3xl group-hover:rotate-12 transition-transform">🌍</span>
                <div className="flex flex-col">
                  <strong className="text-[#2C3E35] dark:text-white text-lg">Find A Helpline</strong>
                  <span className="text-[#607367] dark:text-gray-400 text-sm">International directory of free crisis lines</span>
                </div>
              </a>

              {/* Tertiary Resource */}
              <button 
                onClick={() => alert("In a real app, this would open your device's emergency dialer.")}
                className="flex items-center gap-4 bg-[#F5F2EB] dark:bg-gray-700/50 p-5 rounded-2xl hover:bg-[#E2DFD5] dark:hover:bg-gray-700 transition-colors text-left group"
              >
                <span className="text-3xl group-hover:rotate-12 transition-transform">🚨</span>
                <div className="flex flex-col">
                  <strong className="text-[#2C3E35] dark:text-white text-lg">Local Emergency Services</strong>
                  <span className="text-[#607367] dark:text-gray-400 text-sm">Call your local emergency number (e.g., 911, 999, 112)</span>
                </div>
              </button>

            </div>
          </div>

          {/* Share with Therapist Prompt */}
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 border border-transparent dark:border-gray-700 shadow-sm text-center">
            <h3 className="text-lg font-bold mb-2">Share with a Professional</h3>
            <p className="text-[#607367] dark:text-gray-400 text-sm mb-6 leading-relaxed max-w-md mx-auto">
              If you are working with a therapist or doctor, you can export your recent focus scores and check-in data to share with them.
            </p>
            <button 
              className="bg-white dark:bg-gray-800 border border-[#4A7C59] dark:border-[#A3B18A] text-[#4A7C59] dark:text-[#A3B18A] hover:bg-[#E8F0EA] dark:hover:bg-gray-700 px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
              onClick={() => alert("Summary exported to clipboard!")}
            >
              📋 Export Summary
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SafetyHelp;