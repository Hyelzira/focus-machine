import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SLIDER_METRICS = [
  { id: 'anxiety', question: '1. How anxious do you feel right now?', minLabel: 'Calm', maxLabel: 'Severe' },
  { id: 'pressure', question: '2. How much pressure or stress do you feel?', minLabel: 'None', maxLabel: 'Overwhelmed' },
  { id: 'fear', question: '3. How fearful or on-edge do you feel?', minLabel: 'Grounded', maxLabel: 'Very On-Edge' },
  { id: 'mood', question: '4. How low or heavy is your mood?', minLabel: 'Light / Positive', maxLabel: 'Very Heavy' },
  { id: 'tension', question: '5. How tense does your body feel?', minLabel: 'Relaxed', maxLabel: 'Extremely Tense' }
];

function Checkin({ mode = 'pre', onComplete }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if a quick mood was passed from the Home page
  const quickMood = location.state?.quickMood; 

  const [ratings, setRatings] = useState({
    anxiety: 5, pressure: 5, fear: 5, mood: 5, tension: 5
  });

  const [note, setNote] = useState('');
  const [mindClarity, setMindClarity] = useState('Same');

  const handleSliderChange = (id, value) => {
    setRatings((prev) => ({
      ...prev,
      [id]: parseFloat(value)
    }));
  };

  const handleButtonClick = () => {
    // 1. Bundle the pre-session data
    const preSessionData = {
      ratings,
      note,
      ...(mode === 'post' && { mindClarity })
    };

    if (onComplete) {
      onComplete(preSessionData);
    }

    // 2. Route based on the mode
    if (mode === 'pre') {
      // Send the pre-session data to the Training page
      navigate('/training', { state: preSessionData });
    } else {
      // For post-checkin, pass the ratings and clarity forward to the Complete page
      // We also spread location.state to keep the original game data intact
      navigate('/complete', { 
        state: { 
          ...location.state, 
          postRatings: ratings, 
          mindClarity 
        } 
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 md:px-6 text-[#2C3E35] dark:text-gray-100 font-['Times_New_Roman',_Times,_serif]">
      
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E35] dark:text-white mb-2">
          {mode === 'pre' ? 'Before we begin.' : 'How do you feel now?'}
        </h1>
        <p className="text-[#607367] dark:text-gray-400 text-lg">
          {mode === 'pre' 
            ? 'Take a quiet moment to notice where you are right now. There are no right or wrong answers.' 
            : 'Notice any shifts in your mind and body after your session.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Context */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-28 bg-gradient-to-br from-[#E8F0EA] to-[#F5F2EB] dark:from-gray-800 dark:to-gray-900 rounded-[2rem] p-8 border border-[#DCE5DD] dark:border-gray-700 shadow-sm transition-colors duration-300">
            <span className="text-4xl mb-4 block">🌿</span>
            <h3 className="text-xl font-bold text-[#2C3E35] dark:text-white mb-3">A quiet check-in.</h3>
            <p className="text-sm text-[#607367] dark:text-gray-400 leading-relaxed mb-6">
              This isn't a test. It's a moment to notice. Move the sliders to reflect how you feel—there's no need to overthink it.
            </p>
            <div className="border-t border-[#DCE5DD] dark:border-gray-700 pt-4">
              <p className="text-xs font-semibold text-[#4A7C59] dark:text-[#A3B18A] uppercase tracking-wider">Remember</p>
              <p className="text-sm text-[#2C3E35] dark:text-gray-300 italic mt-1">"You don't have to fix anything right now. Just notice."</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 md:p-8 border border-[#E2DFD5] dark:border-gray-700 shadow-sm transition-colors duration-300">
            
            {/* The "Why" Prompt from Home Page */}
            {quickMood && mode === 'pre' && (
              <div className="mb-8 bg-[#E8F0EA]/50 dark:bg-gray-700/50 border-l-4 border-[#4A7C59] dark:border-[#A3B18A] rounded-r-xl p-5">
                <h3 className="text-lg font-bold text-[#2C3E35] dark:text-white mb-2">
                  You're feeling <span className="text-[#4A7C59] dark:text-[#A3B18A]">{quickMood}</span> today. Why?
                </h3>
                <p className="text-sm text-[#607367] dark:text-gray-400 mb-3">
                  Take a moment to write down what might be contributing to this feeling.
                </p>
                <textarea
                  rows="2"
                  placeholder="e.g., I have a big deadline coming up..."
                  className="w-full p-4 rounded-xl border border-[#C8D6CD] dark:border-gray-600 bg-white dark:bg-gray-900 text-[#2C3E35] dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all font-['Times_New_Roman',_Times,_serif]"
                />
              </div>
            )}

            <div className="flex flex-col gap-8 mb-8">
              {SLIDER_METRICS.map((metric) => (
                <div key={metric.id} className="flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <label htmlFor={metric.id} className="text-[15px] font-bold text-[#2C3E35] dark:text-white block">
                        {metric.question}
                      </label>
                      <span className="text-xs text-[#607367] dark:text-gray-500 font-sans">Notice the sensation without judgment.</span>
                    </div>
                    <span className={`text-lg font-bold px-3 py-1 rounded-lg transition-colors font-sans ${
                      ratings[metric.id] > 7 
                        ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' 
                        : 'bg-[#E8F0EA] text-[#4A7C59] dark:bg-gray-700 dark:text-[#A3B18A]'
                    }`}>
                      {ratings[metric.id]} / 10
                    </span>
                  </div>

                  <input
                    id={metric.id}
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={ratings[metric.id]}
                    onChange={(e) => handleSliderChange(metric.id, e.target.value)}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#4A7C59] bg-[#E2DFD5] dark:bg-gray-600"
                  />

                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[#7E8F84] dark:text-gray-500 font-sans">
                    <span>{metric.minLabel} (0)</span>
                    <span>{metric.maxLabel} (10)</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Post-Session Mind Clarity */}
            {mode === 'post' && (
              <div className="border-t border-[#E2DFD5] dark:border-gray-700 pt-6 mb-8">
                <label className="text-[15px] font-bold text-[#2C3E35] dark:text-white block mb-3">
                  How does your mind feel compared to when you started?
                </label>
                <div className="flex gap-2 font-sans">
                  {['Clearer', 'Same', 'More scattered'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setMindClarity(option)}
                      className={`flex-1 py-3 px-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                        mindClarity === option
                          ? 'bg-[#4A7C59] text-white border-[#4A7C59] shadow-sm'
                          : 'bg-white dark:bg-gray-700 text-[#607367] dark:text-gray-300 border-[#E2DFD5] dark:border-gray-600 hover:bg-[#F5F2EB] dark:hover:bg-gray-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Note */}
            <div className="border-t border-[#E2DFD5] dark:border-gray-700 pt-6 mb-8">
              <label htmlFor="checkin-note" className="text-[15px] font-bold text-[#2C3E35] dark:text-white block mb-2">
                Anything else you want to remember about this moment? (Optional)
              </label>
              <textarea
                id="checkin-note"
                rows="3"
                maxLength={200}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a brief note..."
                className="w-full p-4 rounded-xl border border-[#C8D6CD] dark:border-gray-600 bg-[#F5F2EB] dark:bg-gray-900 text-[#2C3E35] dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all font-['Times_New_Roman',_Times,_serif]"
              />
              <div className="text-right text-xs text-[#7E8F84] dark:text-gray-500 mt-1 font-sans">{note.length} / 200</div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleButtonClick}
              className="w-full bg-[#4A7C59] hover:bg-[#3D664A] text-white font-sans font-bold py-4 rounded-2xl text-lg shadow-lg shadow-[#4A7C59]/20 transition-all hover:-translate-y-0.5"
            >
              {mode === 'pre' ? 'Begin Training →' : 'View Results →'}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkin;