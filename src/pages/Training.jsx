import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MahjongTile from '../components/MahjongTile';

// All available tiles from our new library
const ALL_TILES = ['circle1', 'circle2', 'circle3', 'bamboo1', 'bamboo2', 'character1', 'east', 'south', 'red', 'green'];

const Training = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preSessionData = location.state || { ratings: {}, note: '' };

  const [targetTile, setTargetTile] = useState('circle1');
  const [options, setOptions] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5); // 5 second countdown
  const [trials, setTrials] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [responseTimes, setResponseTimes] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(Date.now());
  const [isSelecting, setIsSelecting] = useState(false);

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

  // 2. Overall Session Timer (Counts up)
  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. Round Countdown (5 seconds per round)
  useEffect(() => {
    if (isSelecting) return; // Pause timer if generating a new set

    if (timeLeft <= 0) {
      // Time is up! Treat as incorrect (timeout)
      handleTimeout();
      return;
    }

    const countdown = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft, isSelecting]);

  // 4. Start the first round
  useEffect(() => {
    generateNewSet();
  }, []);

  const generateNewSet = () => {
    setIsSelecting(true);
    setTimeLeft(5); // Reset timer to 5 seconds
    
    // Pick a random target tile
    const randomTarget = ALL_TILES[Math.floor(Math.random() * ALL_TILES.length)];
    setTargetTile(randomTarget);

    // Generate 3 distinct distractors
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
    // Bell rings when time runs out
    playBell();
    
    // Register as a trial (but incorrect)
    setTrials((prev) => prev + 1);
    setResponseTimes((prev) => [...prev, 5000]); // 5000ms for timeout
    
    // Move to next set after a brief pause
    setTimeout(() => {
      generateNewSet();
    }, 800);
  };

  const handleSelect = (selectedTile) => {
    if (isSelecting) return;
    setIsSelecting(true); 
    
    // Calculate response time
    const now = Date.now();
    const rt = now - lastClickTime;
    setResponseTimes((prev) => [...prev, rt]);

    setTrials((prev) => prev + 1);
    if (selectedTile === targetTile) {
      setCorrect((prev) => prev + 1);
      playBell(); // Play bell on correct answer too (optional)
    }
    
    setTimeout(() => {
      generateNewSet();
    }, 200);
  };

  const handleSubmit = () => {
    // PDF Formula Calculation
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
      
      {/* Top Bar */}
      <div className="w-full max-w-2xl flex justify-between items-center px-4 relative z-10">
        <button onClick={() => navigate('/')} className="text-[#607367] hover:text-[#2C3E35] font-bold bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm font-sans">
          ✕ Cancel
        </button>
        
        <div className="bg-white/80 backdrop-blur-md border border-[#E2DFD5] px-8 py-2.5 rounded-full shadow-sm">
          <span className="text-xl font-bold text-[#2C3E35] font-mono tracking-widest">
            {formatTime(timeElapsed)}
          </span>
        </div>

        {/* 5-Second Countdown Bar */}
        <div className="w-24 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className={`h-2.5 rounded-full transition-all duration-1000 ease-linear ${timeLeft <= 2 ? 'bg-red-500' : 'bg-[#4A7C59]'}`}
            style={{ width: `${(timeLeft / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl gap-12 relative z-10 mt-8">
        
        <h2 className="text-[#607367] font-bold text-lg tracking-wide uppercase font-sans">
          Find the matching tile
        </h2>

        {/* Target Tile */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#4A7C59]/20 blur-xl rounded-3xl"></div>
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