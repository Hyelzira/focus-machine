import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the real data passed from Training.jsx
  const sessionData = location.state || { 
    duration: 0, 
    accuracy: 0, 
    focusLevel: 1,
    trials: 0,
    preRatings: {},
    preNote: ''
  };

  // Format the real seconds into MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Determine the label based on focus level
  const getLabel = (level) => {
    if (level >= 8) return "Focused";
    if (level >= 6) return "Steady";
    if (level >= 4) return "Building";
    return "Fragmented";
  };

  return (
    // Ambient Background
    <div className="min-h-screen w-full relative flex flex-col items-center py-12 px-4 bg-[#F5F2EB] dark:bg-gray-900 transition-colors duration-500 overflow-hidden font-['Times_New_Roman',_Times,_serif]">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-[#4A7C59]/10 dark:bg-[#4A7C59]/20 rounded-full blur-[120px] pointer-events-none transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-[#A3B18A]/20 dark:bg-[#A3B18A]/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-500"></div>

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-[#2C3E35] dark:text-gray-100">
        
        {/* 1. Focus Level Circle */}
        <div className="relative w-48 h-48 mb-6">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#E2DFD5] dark:stroke-gray-700" strokeWidth="2.5" />
            {/* Progress Fill */}
            <circle 
              cx="18" cy="18" r="16" fill="none" 
              className="stroke-[#4A7C59] dark:stroke-[#A3B18A] transition-all duration-1000 ease-out" 
              strokeWidth="2.5" 
              strokeDasharray={`${(sessionData.focusLevel / 10) * 100}, 100`} 
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-baseline font-sans">
              <span className="text-6xl font-extrabold text-[#4A7C59] dark:text-[#A3B18A] tracking-tighter">
                {sessionData.focusLevel}
              </span>
              <span className="text-xl font-bold text-[#607367] dark:text-gray-400 ml-1">
                / 10
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-1">{getLabel(sessionData.focusLevel)}</h2>
        <p className="text-[#607367] dark:text-gray-400 uppercase tracking-widest text-sm font-bold mb-10 font-sans">Focus Level</p>

        {/* 2. Stats Cards */}
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-[#E2DFD5] dark:border-gray-700 rounded-3xl p-6 flex flex-col items-center shadow-sm">
            <span className="text-3xl mb-2 font-sans">⏱️</span>
            <span className="text-2xl font-bold mb-1 font-mono tracking-tight">
              {formatTime(sessionData.duration)}
            </span>
            <span className="text-xs font-bold text-[#607367] dark:text-gray-400 uppercase tracking-wider font-sans">Duration</span>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-[#E2DFD5] dark:border-gray-700 rounded-3xl p-6 flex flex-col items-center shadow-sm">
            <span className="text-3xl mb-2 font-sans">🎯</span>
            <span className="text-2xl font-bold mb-1 font-sans">{sessionData.accuracy}%</span>
            <span className="text-xs font-bold text-[#607367] dark:text-gray-400 uppercase tracking-wider font-sans">Accuracy</span>
          </div>

        </div>

        {/* 3. Feedback Quote */}
        <div className="w-full bg-[#E8F0EA]/50 dark:bg-gray-800/50 backdrop-blur-sm border-l-4 border-[#4A7C59] dark:border-[#A3B18A] rounded-r-2xl p-6 mb-10 shadow-sm">
          <p className="italic text-[#2C3E35] dark:text-gray-300 leading-relaxed text-lg text-center">
            {sessionData.trials < 5 ? (
              "Short session - more data needed for a fuller picture. Even a brief pause is a victory."
            ) : sessionData.duration < 60 ? (
              `You practised for ${sessionData.duration} seconds today. Showing up is the most important step.`
            ) : (
              `You practised for ${Math.floor(sessionData.duration / 60)} minutes and ${sessionData.duration % 60} seconds today. Your attention held steady.`
            )}
          </p>
        </div>

        {/* Action Button - Passes all data (including preRatings) to Post-Check-in */}
        <button 
          onClick={() => navigate('/post-checkin', { state: sessionData })} 
          className="w-full bg-[#4A7C59] hover:bg-[#3D664A] text-white font-sans font-bold py-4 rounded-2xl shadow-lg shadow-[#4A7C59]/30 transition-all hover:-translate-y-1 text-lg"
        >
          Continue to Check-in →
        </button>

      </div>
    </div>
  );
};

export default Results;