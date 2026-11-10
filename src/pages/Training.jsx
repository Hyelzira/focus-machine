import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MahjongTile from '../components/MahjongTile';

const ALL_TILES = ['circle1', 'circle2', 'circle3', 'bamboo1', 'bamboo2', 'character1', 'east', 'south', 'red', 'green'];

const Training = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preSessionData = location.state || { ratings: {}, note: '' };

  // --- Game State ---
  const [targetTile, setTargetTile] = useState('circle1');
  const [options, setOptions] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [trials, setTrials] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [responseTimes, setResponseTimes] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(Date.now());
  const [isSelecting, setIsSelecting] = useState(false);

  // --- PDF Correction States ---
  const [isGentleMode] = useState(localStorage.getItem('gentleMode') === 'true');
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [showCalmPause, setShowCalmPause] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [adaptiveMessage, setAdaptiveMessage] = useState('');

  // Determine round time based on mode
  const maxTime = isGentleMode ? 8 : 5;

  // 1. Play Bell Sound
  const playBell = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, context.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1);
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 1);
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  // 2. Overall Session Timer
  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. Round Countdown
  useEffect(() => {
    if (isSelecting || showCalmPause) return;

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const countdown = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft, isSelecting, showCalmPause]);

  // 4. Start Game
  useEffect(() => {
    generateNewSet();
  }, []);

  const generateNewSet = () => {
    setIsSelecting(true);
    setTimeLeft(maxTime);
    
    const randomTarget = ALL_TILES[Math.floor(Math.random() * ALL_TILES.length)];
    setTargetTile(randomTarget);

    let distractors = [];
    while (distractors.length < 3) {
      const randomTile = ALL_TILES[Math.floor(Math.random() * ALL_TILES.length)];
      if (randomTile !== randomTarget && !distractors.includes(randomTile)) {
        distractors.push(randomTile);
      }
    }

    setOptions([randomTarget, ...distractors].sort(() => Math.random() - 0.5));
    setLastClickTime(Date.now());
    setIsSelecting(false);
  };

  const handleTimeout = () => {
    playBell();
    
    setTrials((prev) => prev + 1);
    setResponseTimes((prev) => [...prev, maxTime * 1000]);
    
    // PDF Correction: Track consecutive errors
    setConsecutiveCorrect(0);
    setConsecutiveErrors((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        setShowCalmPause(true);
        return 0; // Reset after triggering pause
      }
      return newCount;
    });
    
    setTimeout(() => {
      generateNewSet();
    }, 800);
  };

  const handleSelect = (selectedTile) => {
    if (isSelecting || showCalmPause) return;
    setIsSelecting(true); 
    
    const now = Date.now();
    const rt = now - lastClickTime;
    setResponseTimes((prev) => [...prev, rt]);

    setTrials((prev) => prev + 1);

    if (selectedTile === targetTile) {
      setCorrect((prev) => prev + 1);
      playBell();
      
      // PDF Correction: Reset errors & track consecutive correct
      setConsecutiveErrors(0);
      setConsecutiveCorrect((prev) => {
        const newCount = prev + 1;
        if (newCount === 3) {
          setAdaptiveMessage("Attention is stretching — symbols are becoming more similar.");
          setTimeout(() => setAdaptiveMessage(''), 4000);
        }
        return newCount;
      });

    } else {
      // Incorrect
      setConsecutiveCorrect(0);
      setConsecutiveErrors((prev) => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          setShowCalmPause(true);
          return 0;
        }
        return newCount;
      });
    }
    
    setTimeout(() => {
      generateNewSet();
    }, 200);
  };

  const handleSubmit = () => {
    const accuracyPercentage = trials > 0 ? (correct / trials) * 100 : 0;
    const accuracyComponent = accuracyPercentage / 100;

    let consistencyComponent = 1;
    if (responseTimes.length > 1) {
      const mean = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const variance = responseTimes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / responseTimes.length;
      const sd = Math.sqrt(variance);
      consistencyComponent = 1 - Math.min(1, sd / 1000);
    }

    const durationComponent = Math.min(1, timeElapsed / 420);
    const rawScore = (0.45 * accuracyComponent) + (0.30 * consistencyComponent) + (0.25 * durationComponent);
    let focusLevel = Math.round(rawScore * 9) + 1;

    if (trials < 5) focusLevel = Math.min(4, focusLevel);

    const finalSessionData = {
      duration: timeElapsed, 
      accuracy: Math.round(accuracyPercentage),
      focusLevel: focusLevel,
      trials: trials,
      preRatings: preSessionData.ratings,
      preNote: preSessionData.note
    };

    try {
      const existingHistory = JSON.parse(localStorage.getItem('sessionHistory') || '[]');
      localStorage.setItem('sessionHistory', JSON.stringify([...existingHistory, { id: Date.now(), date: new Date().toISOString(), ...finalSessionData }]));
    } catch (e) {}

    navigate('/results', { state: finalSessionData });
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-between py-8 px-4 select-none bg-[#F5F2EB] dark:bg-gray-900 transition-colors duration-500 overflow-hidden font-['Times_New_Roman',_Times,_serif]">
      
      {/* CALM PAUSE MODAL */}
      {showCalmPause && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F2EB]/90 dark:bg-gray-900/90 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl text-center max-w-md mx-4 border border-[#E2DFD5] dark:border-gray-700">
            <span className="text-5xl mb-6 block">🌿</span>
            <h2 className="text-3xl font-bold mb-3 text-[#2C3E35] dark:text-white">Notice the urge to rush.</h2>
            <p className="text-[#607367] dark:text-gray-400 mb-8 text-lg">Take a deep breath. There is no hurry here. Continue when you are ready.</p>
            <button 
              onClick={() => setShowCalmPause(false)}
              className="bg-[#4A7C59] hover:bg-[#3D664A] text-white px-10 py-4 rounded-full font-sans font-bold shadow-lg transition-all"
            >
              I'm Ready to Continue
            </button>
          </div>
        </div>
      )}

      {/* ADAPTIVE DIFFICULTY MESSAGE */}
      {adaptiveMessage && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 bg-[#E8F0EA] dark:bg-gray-800 text-[#4A7C59] dark:text-[#A3B18A] px-6 py-3 rounded-full text-sm font-bold shadow-md animate-in fade-in slide-in-from-top-4 font-sans border border-[#A3B18A]/30">
          {adaptiveMessage}
        </div>
      )}

      {/* Top Bar */}
      <div className="w-full max-w-2xl flex justify-between items-center px-4 relative z-10">
        <button onClick={() => navigate('/')} className="text-[#607367] hover:text-[#2C3E35] font-bold bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm font-sans transition-colors">
          ✕ Cancel
        </button>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-[#E2DFD5] dark:border-gray-700 px-8 py-2.5 rounded-full shadow-sm">
          <span className="text-xl font-bold text-[#2C3E35] dark:text-white font-mono tracking-widest">
            {formatTime(timeElapsed)}
          </span>
        </div>

        {/* Dynamic Countdown Bar */}
        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full transition-all duration-1000 ease-linear ${timeLeft <= 2 ? 'bg-red-500' : 'bg-[#4A7C59]'}`}
            style={{ width: `${(timeLeft / maxTime) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl gap-12 relative z-10 mt-8">
        
        <h2 className="text-[#607367] dark:text-gray-400 font-bold text-lg tracking-wide uppercase font-sans">
          Find the matching tile
        </h2>

        {/* Target Tile */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#4A7C59]/20 dark:bg-[#4A7C59]/40 blur-xl rounded-3xl"></div>
          <MahjongTile type={targetTile} size={140} isTarget={true} />
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full justify-items-center mt-4">
          {options.map((tile, index) => (
            <MahjongTile 
              key={index} 
              type={tile} 
              size={90} 
              onClick={() => handleSelect(tile)} 
            />
          ))}
        </div>

      </div>

      {/* Submit Button */}
      <div className="w-full max-w-md px-4 pb-6 relative z-10 mt-12">
        <button onClick={handleSubmit} className="w-full bg-[#4A7C59] hover:bg-[#3D664A] text-white font-sans font-bold py-4 rounded-2xl shadow-lg transition-all hover:-translate-y-1 text-lg">
          Submit Session
        </button>
      </div>

    </div>
  );
};

export default Training;