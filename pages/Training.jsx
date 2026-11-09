import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SymbolTile from '../components/SymbolTile';

const SHAPES = ['circle', 'square', 'diamond', 'triangle', 'hexagon'];

const Training = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Receive the pre-session ratings from the Check-in page
  const preSessionData = location.state || { ratings: {}, note: '' };

  const [targetShape, setTargetShape] = useState('circle');
  const [options, setOptions] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [trials, setTrials] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  
  // Track response times for the Consistency metric
  const [responseTimes, setResponseTimes] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    generateNewSet();
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const triggerPulse = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  };

  const generateNewSet = () => {
    const randomTarget = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    setTargetShape(randomTarget);

    let distractors = [];
    while (distractors.length < 3) {
      const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      if (randomShape !== randomTarget && !distractors.includes(randomShape)) {
        distractors.push(randomShape);
      }
    }
    setOptions([randomTarget, ...distractors].sort(() => Math.random() - 0.5));
    triggerPulse();
    
    setLastClickTime(Date.now());
  };

  const handleSelect = (selectedShape) => {
    if (isSelecting) return;
    setIsSelecting(true); 
    
    const now = Date.now();
    const rt = now - lastClickTime;
    setResponseTimes((prev) => [...prev, rt]);

    setTrials((prev) => prev + 1);
    if (selectedShape === targetShape) {
      setCorrect((prev) => prev + 1);
    }
    
    setTimeout(() => {
      generateNewSet();
      setIsSelecting(false);
    }, 200);
  };

  const handleSubmit = () => {
    // --- CALCULATE FOCUS LEVEL (PDF Section 6) ---
    const accuracyPercentage = trials > 0 ? (correct / trials) * 100 : 0;
    const accuracyComponent = accuracyPercentage / 100;

    let consistencyComponent = 1;
    if (responseTimes.length > 1) {
      const mean = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const variance = responseTimes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / responseTimes.length;
      const sd = Math.sqrt(variance);
      const targetSd = 1000; 
      consistencyComponent = 1 - Math.min(1, sd / targetSd);
    }

    const durationComponent = Math.min(1, timeElapsed / 420);
    const rawScore = (0.45 * accuracyComponent) + (0.30 * consistencyComponent) + (0.25 * durationComponent);
    let focusLevel = Math.round(rawScore * 9) + 1;

    if (trials < 5) {
      focusLevel = Math.min(4, focusLevel);
    }

    // 2. Bundle ALL data together
    const finalSessionData = {
      duration: timeElapsed, 
      accuracy: Math.round(accuracyPercentage),
      focusLevel: focusLevel,
      trials: trials,
      preRatings: preSessionData.ratings, // Pass the pre-ratings forward
      preNote: preSessionData.note
    };

    // 3. Save to LocalStorage (for the Progress page history)
    try {
      const existingHistory = JSON.parse(localStorage.getItem('sessionHistory') || '[]');
      const newSessionRecord = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...finalSessionData
      };
      localStorage.setItem('sessionHistory', JSON.stringify([...existingHistory, newSessionRecord]));
    } catch (error) {
      console.error("Failed to save session to local storage", error);
    }

    // 4. Send to Results page
    navigate('/results', { state: finalSessionData });
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-between py-8 px-4 select-none bg-[#F5F2EB] dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#4A7C59]/10 dark:bg-[#4A7C59]/20 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#A3B18A]/20 dark:bg-[#A3B18A]/10 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"></div>

      {/* Top Bar */}
      <div className="w-full max-w-2xl flex justify-between items-center px-4 relative z-10">
        <button 
          onClick={() => navigate('/')} 
          className="text-[#607367] dark:text-gray-400 hover:text-[#2C3E35] dark:hover:text-white font-bold transition-colors bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm font-sans"
        >
          ✕ Cancel
        </button>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-[#E2DFD5] dark:border-gray-700 px-8 py-2.5 rounded-full shadow-sm">
          <span className="text-xl font-bold text-[#2C3E35] dark:text-white font-mono tracking-widest">
            {formatTime(timeElapsed)}
          </span>
        </div>

        <div className="w-[88px]"></div> 
      </div>

      {/* Main Game Area */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl gap-12 relative z-10 mt-8">
        
        <h2 className="text-[#607367] dark:text-gray-300 font-bold text-lg tracking-wide uppercase font-sans">
          Find the matching symbol
        </h2>

        {/* Target Symbol */}
        <div className={`relative transition-all duration-300 ${pulse ? 'scale-105' : 'scale-100'}`}>
          <div className="absolute inset-0 bg-[#4A7C59]/20 dark:bg-[#4A7C59]/40 blur-xl rounded-3xl"></div>
          <SymbolTile shape={targetShape} size={140} isTarget={true} />
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full justify-items-center mt-4">
          {options.map((shape, index) => (
            <SymbolTile 
              key={index} 
              shape={shape} 
              size={90} 
              onClick={() => handleSelect(shape)} 
            />
          ))}
        </div>

      </div>

      {/* Bottom Bar: Submit */}
      <div className="w-full max-w-md px-4 pb-6 relative z-10 mt-12">
        <button 
          onClick={handleSubmit} 
          className="w-full bg-[#4A7C59] hover:bg-[#3D664A] text-white font-sans font-bold py-4 rounded-2xl shadow-lg shadow-[#4A7C59]/30 transition-all hover:-translate-y-1 text-lg tracking-wide"
        >
          Submit Session
        </button>
      </div>

    </div>
  );
};

export default Training;