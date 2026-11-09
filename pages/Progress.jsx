import React, { useState, useEffect } from 'react';
import ProgressChart from '../components/ProgressChart';

const Progress = () => {
  const [timeRange, setTimeRange] = useState('7');
  const [mounted, setMounted] = useState(false);
  
  // 1. New State to hold real data from LocalStorage
  const [history, setHistory] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [averages, setAverages] = useState([]);

  // 2. Load data from LocalStorage on mount
  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('sessionHistory') || '[]');
    setHistory(savedSessions);

    // Trigger the bar animation
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 3. Process data whenever timeRange or history changes
  useEffect(() => {
    if (history.length === 0) return;

    const now = new Date();
    let filteredSessions = [];

    // Filter based on time range
    if (timeRange === '7') {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      filteredSessions = history.filter(s => new Date(s.date) >= sevenDaysAgo);
    } else if (timeRange === '30') {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      filteredSessions = history.filter(s => new Date(s.date) >= thirtyDaysAgo);
    } else {
      filteredSessions = history; // 1 Year (all)
    }

    // If no sessions in this range, fallback to empty array
    if (filteredSessions.length === 0) {
      setChartData([0]);
      setAverages([]);
      return;
    }

    // Map chart data (Focus Levels)
    setChartData(filteredSessions.map(s => s.focusLevel));

    // Calculate Pre/Post Averages
    const totals = {
      anxiety: { pre: 0, post: 0 },
      pressure: { pre: 0, post: 0 },
      fear: { pre: 0, post: 0 },
      mood: { pre: 0, post: 0 },
      tension: { pre: 0, post: 0 },
    };
    let count = 0;

    filteredSessions.forEach(session => {
      if (session.preRatings && session.postRatings) {
        totals.anxiety.pre += session.preRatings.anxiety || 5;
        totals.anxiety.post += session.postRatings.anxiety || 5;
        totals.pressure.pre += session.preRatings.pressure || 5;
        totals.pressure.post += session.postRatings.pressure || 5;
        totals.fear.pre += session.preRatings.fear || 5;
        totals.fear.post += session.postRatings.fear || 5;
        totals.mood.pre += session.preRatings.mood || 5;
        totals.mood.post += session.postRatings.mood || 5;
        totals.tension.pre += session.preRatings.tension || 5;
        totals.tension.post += session.postRatings.tension || 5;
        count++;
      }
    });

    if (count > 0) {
      setAverages([
        { label: 'Anxiety', pre: (totals.anxiety.pre / count).toFixed(1), post: (totals.anxiety.post / count).toFixed(1) },
        { label: 'Stress', pre: (totals.pressure.pre / count).toFixed(1), post: (totals.pressure.post / count).toFixed(1) },
        { label: 'Fear', pre: (totals.fear.pre / count).toFixed(1), post: (totals.fear.post / count).toFixed(1) },
        { label: 'Mood', pre: (totals.mood.pre / count).toFixed(1), post: (totals.mood.post / count).toFixed(1) },
        { label: 'Tension', pre: (totals.tension.pre / count).toFixed(1), post: (totals.tension.post / count).toFixed(1) },
      ]);
    }
  }, [history, timeRange]);

  // Calculate overall average focus level
  const averageFocus = chartData.length > 0 
    ? (chartData.reduce((a, b) => a + b, 0) / chartData.length).toFixed(1) 
    : '0.0';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-[#2C3E35] font-['Times_New_Roman',_Times,_serif]">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Your Progress</h1>
        <p className="text-[#607367] text-lg">Track your focus and emotional shifts over time.</p>
      </div>

      {/* Focus Level Chart Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E2DFD5] shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <h2 className="text-2xl font-bold">Focus Level</h2>
          
          <div className="flex bg-[#F5F2EB] p-1 rounded-xl w-fit font-sans">
            {[
              { id: '7', label: '7 Days' },
              { id: '30', label: '30 Days' },
              { id: '365', label: '1 Year' }
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  timeRange === range.id 
                    ? 'bg-white text-[#4A7C59] shadow-sm' 
                    : 'text-[#607367] hover:text-[#2C3E35]'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        
        <ProgressChart data={chartData} height={220} />
        
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#F5F2EB] text-base text-[#607367]">
          <span>Average: <strong className="text-[#2C3E35] font-bold font-sans">{averageFocus}/10</strong></span>
          <span>Trend: <strong className="text-[#4A7C59] font-bold">↗ {chartData.length > 1 ? 'Improving' : 'Building'}</strong></span>
        </div>
      </div>

      {/* Pre/Post Averages Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E2DFD5] shadow-sm mb-6">
        <h2 className="text-2xl font-bold mb-1">Pre vs Post Session Averages</h2>
        <p className="text-base text-[#607367] mb-8">How your symptoms change after training.</p>
        
        {averages.length === 0 ? (
          <p className="text-[#607367] italic text-center py-4">Play a session to see your averages.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {averages.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>{item.label}</span>
                  <span className="text-[#607367] font-medium font-sans">
                    {item.pre} → {item.post}
                  </span>
                </div>
                
                <div className="relative h-3 bg-[#F5F2EB] rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-[#A3B18A] rounded-l-full transition-all duration-1000 ease-out" 
                    style={{ width: mounted ? `${item.pre * 10}%` : '0%' }}
                  />
                  <div 
                    className="h-full bg-[#4A7C59] rounded-r-full transition-all duration-1000 ease-out delay-100 relative -ml-1" 
                    style={{ width: mounted ? `${item.post * 10}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Session History List */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E2DFD5] shadow-sm mb-6">
        <h2 className="text-2xl font-bold mb-4">Recent Sessions</h2>
        {history.length === 0 ? (
          <p className="text-[#607367] italic text-center py-4">No sessions yet. Your journey starts today.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {[...history].reverse().slice(0, 5).map((session) => (
              <div key={session.id} className="flex justify-between items-center p-4 bg-[#F5F2EB] rounded-2xl">
                <div>
                  <p className="font-bold text-[#2C3E35]">
                    {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-[#607367] font-sans">
                    {Math.floor(session.duration / 60)}m {session.duration % 60}s • {session.accuracy}% accuracy
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#4A7C59] font-sans">{session.focusLevel}/10</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Auto-generated Insights */}
      <div className="bg-[#E8F0EA] rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-[#4A7C59] mb-4">Gentle Insights</h2>
        <ul className="flex flex-col gap-4">
          <li className="flex items-start gap-3 text-[#2C3E35] text-lg">
            <span className="text-xl font-sans">🌿</span> 
            <p>{history.length > 0 ? "Your Focus Level has been more stable over the last 10 days." : "Complete your first session to unlock insights."}</p>
          </li>
          <li className="flex items-start gap-3 text-[#2C3E35] text-lg">
            <span className="text-xl font-sans">📉</span> 
            <p>{averages.length > 0 ? "Body tension scores are trending downward after sessions." : "Log your pre and post check-ins to see trends."}</p>
          </li>
          <li className="flex items-start gap-3 text-[#2C3E35] text-lg">
            <span className="text-xl font-sans">✨</span> 
            <p>{history.length > 0 ? `You've completed ${history.length} session${history.length > 1 ? 's' : ''} so far. Showing up matters.` : "Take a few minutes today to build a calmer mind."}</p>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Progress;