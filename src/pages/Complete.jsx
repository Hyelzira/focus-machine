import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const Complete = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get ALL data passed from the previous step
  const data = location.state || { 
    duration: 0, 
    accuracy: 0, 
    focusLevel: 1,
    preRatings: { anxiety: 5, pressure: 5, fear: 5, mood: 5, tension: 5 },
    postRatings: { anxiety: 5, pressure: 5, fear: 5, mood: 5, tension: 5 },
    mindClarity: 'Same'
  };

  // Format the real seconds into MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Simulate exporting data to clipboard
  const handleShareSummary = () => {
    const summaryText = `Focus Machine Session Summary:\nFocus Level: ${data.focusLevel}/10\nAccuracy: ${data.accuracy}%\nDuration: ${formatTime(data.duration)}\nMind Clarity: ${data.mindClarity}\n\nPre-Session Anxiety: ${data.preRatings?.anxiety || 5}/10\nPost-Session Anxiety: ${data.postRatings?.anxiety || 5}/10`;
    navigator.clipboard.writeText(summaryText);
    alert("Summary copied to clipboard! You can now paste this in an email or message to your therapist.");
  };

  // Helper to render the Pre -> Post shift
  const renderShift = (label, preVal, postVal) => {
    // If post is lower (e.g., anxiety dropped), it's an improvement (green)
    // If post is higher (e.g., mood increased), it's an improvement (green)
    // For simplicity, we'll just color the arrow green if it moved towards a better state.
    const isImprovement = (label === 'Mood' || label === 'Tension') ? postVal < preVal : postVal < preVal;
    
    return (
      <div className="flex justify-between items-center bg-white/50 dark:bg-gray-900/50 p-2 rounded-lg">
        <span className="text-sm text-[#607367] dark:text-gray-400 font-semibold">{label}</span>
        <div className="flex items-center gap-2 font-sans font-bold">
          <span className="text-[#2C3E35] dark:text-white">{preVal}</span>
          <span className="text-[#A0AAB2]">→</span>
          <span className={isImprovement ? 'text-[#4A7C59] dark:text-[#A3B18A]' : 'text-amber-600 dark:text-amber-400'}>
            {postVal}
          </span>
        </div>
      </div>
    );
  };

  return (
    // Immersive Ambient Background
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center py-12 px-4 bg-[#F5F2EB] dark:bg-gray-900 transition-colors duration-500 overflow-hidden font-['Times_New_Roman',_Times,_serif]">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-[#4A7C59]/10 dark:bg-[#4A7C59]/20 rounded-full blur-[120px] pointer-events-none transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-[#A3B18A]/20 dark:bg-[#A3B18A]/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-500"></div>

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center text-[#2C3E35] dark:text-gray-100">
        
        {/* Animated Success Icon with Custom Logo */}
        <div className="w-24 h-24 bg-[#E8F0EA] dark:bg-gray-800 rounded-full flex items-center justify-center mb-8 shadow-sm border border-[#4A7C59]/20 dark:border-gray-700 relative overflow-hidden">
           <div className="absolute inset-0 bg-[#4A7C59]/20 dark:bg-[#4A7C59]/40 blur-xl rounded-full"></div>
           <img 
             src={logoImg} 
             alt="Focus Machine Logo" 
             className="w-full h-full object-contain scale-[2.5] relative z-10" 
           />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C3E35] dark:text-white leading-tight">
          You showed up for your attention today.
        </h1>
        
        <p className="text-[#607367] dark:text-gray-400 text-lg mb-8 max-w-md">
          Every session is a step toward a calmer, more focused mind.
        </p>

        {/* Session Recap Stats */}
        <div className="grid grid-cols-2 gap-4 w-full mb-6 font-sans">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-[#E2DFD5] dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center shadow-sm">
            <span className="text-2xl font-bold text-[#4A7C59] dark:text-[#A3B18A]">{data.focusLevel}/10</span>
            <span className="text-xs font-bold text-[#607367] dark:text-gray-400 uppercase tracking-wider">Focus Level</span>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-[#E2DFD5] dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center shadow-sm">
            <span className="text-2xl font-bold text-[#4A7C59] dark:text-[#A3B18A]">{data.accuracy}%</span>
            <span className="text-xs font-bold text-[#607367] dark:text-gray-400 uppercase tracking-wider">Accuracy</span>
          </div>
        </div>

        {/* Pre -> Post Comparison Card */}
        <div className="bg-[#E8F0EA]/50 dark:bg-gray-800/50 backdrop-blur-sm border border-[#E2DFD5] dark:border-gray-700 rounded-3xl p-6 w-full mb-8 shadow-sm">
          <h3 className="text-sm font-bold text-[#4A7C59] dark:text-[#A3B18A] uppercase tracking-wider mb-4 font-sans">Your Shift</h3>
          
          <div className="flex flex-col gap-2 mb-4">
            {renderShift('Anxiety', data.preRatings?.anxiety || 5, data.postRatings?.anxiety || 5)}
            {renderShift('Stress', data.preRatings?.pressure || 5, data.postRatings?.pressure || 5)}
            {renderShift('Fear', data.preRatings?.fear || 5, data.postRatings?.fear || 5)}
            {renderShift('Mood', data.preRatings?.mood || 5, data.postRatings?.mood || 5)}
            {renderShift('Tension', data.preRatings?.tension || 5, data.postRatings?.tension || 5)}
          </div>

          <div className="border-t border-[#E2DFD5] dark:border-gray-700 pt-3 text-sm">
            <p className="text-[#2C3E35] dark:text-gray-300">
              <strong className="font-semibold font-sans">Mind Clarity:</strong> {data.mindClarity}
            </p>
          </div>
        </div>

        {/* Share Prompt Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-[#E2DFD5] dark:border-gray-700 rounded-3xl p-6 w-full mb-10 shadow-sm">
          <p className="text-[#2C3E35] dark:text-gray-200 font-medium mb-4">
            Would you like to share today's results with a therapist or doctor?
          </p>
          <button 
            onClick={handleShareSummary}
            className="w-full flex items-center justify-center gap-2 bg-[#F5F2EB] dark:bg-gray-700 hover:bg-[#E2DFD5] dark:hover:bg-gray-600 text-[#4A7C59] dark:text-[#A3B18A] font-sans font-bold py-3 px-4 rounded-xl transition-colors border border-[#E2DFD5] dark:border-gray-600"
          >
            📋 Export / Copy Summary
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full font-sans">
          <Link 
            to="/" 
            className="flex-1 bg-white dark:bg-gray-800 border-2 border-[#4A7C59] dark:border-[#A3B18A] text-[#4A7C59] dark:text-[#A3B18A] hover:bg-[#E8F0EA] dark:hover:bg-gray-700 font-bold py-4 rounded-2xl transition-all text-lg shadow-sm text-center flex items-center justify-center"
          >
            Done
          </Link>
          
          <button 
            onClick={() => navigate('/checkin')} 
            className="flex-1 bg-[#4A7C59] hover:bg-[#3D664A] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#4A7C59]/30 transition-all hover:-translate-y-1 text-lg flex items-center justify-center"
          >
            Start another round
          </button>
        </div>

      </div>
    </div>
  );
};

export default Complete;