import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingSlider from '../components/RatingSlider';

const PostSessionCheckin = () => {
  const navigate = useNavigate();

  // --- MOCK PRE-SESSION DATA ---
  // In a real app, this would come from your state/context after the user finishes Training.
  const preSessionData = {
    anxiety: 6,
    pressure: 7,
    fear: 5,
    mood: 4,
    tension: 8
  };

  // State for the five sliders (initialized to mid-point 5)
  const [ratings, setRatings] = useState({
    anxiety: 5,
    pressure: 5,
    fear: 5,
    mood: 5,
    tension: 5
  });

  // State for the new Mind Clarity question
  const [mindClarity, setMindClarity] = useState(null);

  // Handle slider changes
  const handleRatingChange = (key, value) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mindClarity === null) {
      alert("Please answer how your mind feels compared to when you started.");
      return;
    }

    // Here you would normally save the post-session data to your database/local storage
    console.log("Saved Post-Session Data:", { ...ratings, mindClarity });
    
    // Navigate to the final closing screen
    navigate('/complete');
  };

  // Helper to render the pre -> post comparison
  const renderComparison = (label, preValue, postValue) => {
    const difference = postValue - preValue;
    // If difference is negative (e.g., anxiety went from 7 to 4), that's usually good.
    const isImprovement = difference < 0; 
    
    return (
      <div className="comparison-row">
        <span className="comparison-label">{label}</span>
        <div className="comparison-bars">
          <div className="bar-group">
            <span className="bar-label">Pre</span>
            <div className="bar-track"><div className="bar-fill pre" style={{ width: `${preValue * 10}%` }}></div></div>
            <span className="bar-value">{preValue}</span>
          </div>
          <div className="bar-group">
            <span className="bar-label">Post</span>
            <div className="bar-track"><div className={`bar-fill post ${isImprovement ? 'better' : ''}`} style={{ width: `${postValue * 10}%` }}></div></div>
            <span className="bar-value">{postValue}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="checkin-container">
      <div className="checkin-header">
        <h1>How do you feel now?</h1>
        <p>Take a moment to notice any changes after your session.</p>
      </div>

      <form onSubmit={handleSubmit} className="checkin-form">
        
        {/* The 5 Sliders (Same as Pre-Session) */}
        <div className="sliders-section">
          <RatingSlider 
            label="How anxious do you feel right now?" 
            value={ratings.anxiety} 
            onChange={(val) => handleRatingChange('anxiety', val)} 
            minLabel="Calm" maxLabel="Anxious"
          />
          <RatingSlider 
            label="How much pressure or stress do you feel?" 
            value={ratings.pressure} 
            onChange={(val) => handleRatingChange('pressure', val)} 
            minLabel="Relaxed" maxLabel="Stressed"
          />
          <RatingSlider 
            label="How fearful or on-edge do you feel?" 
            value={ratings.fear} 
            onChange={(val) => handleRatingChange('fear', val)} 
            minLabel="Safe" maxLabel="On-edge"
          />
          <RatingSlider 
            label="How low or heavy is your mood?" 
            value={ratings.mood} 
            onChange={(val) => handleRatingChange('mood', val)} 
            minLabel="Light" maxLabel="Heavy"
          />
          <RatingSlider 
            label="How tense does your body feel?" 
            value={ratings.tension} 
            onChange={(val) => handleRatingChange('tension', val)} 
            minLabel="Loose" maxLabel="Tense"
          />
        </div>

        {/* New Mind Clarity Question */}
        <div className="clarity-section">
          <h3>How does your mind feel compared to when you started?</h3>
          <div className="clarity-options">
            <button 
              type="button"
              className={`clarity-btn ${mindClarity === 'Clearer' ? 'active' : ''}`}
              onClick={() => setMindClarity('Clearer')}
            >
              Clearer
            </button>
            <button 
              type="button"
              className={`clarity-btn ${mindClarity === 'Same' ? 'active' : ''}`}
              onClick={() => setMindClarity('Same')}
            >
              Same
            </button>
            <button 
              type="button"
              className={`clarity-btn ${mindClarity === 'More scattered' ? 'active' : ''}`}
              onClick={() => setMindClarity('More scattered')}
            >
              More scattered
            </button>
          </div>
        </div>

        {/* Pre -> Post Comparison (Shows up dynamically as they move sliders) */}
        <div className="comparison-section">
          <h3>Your Shift</h3>
          <div className="comparison-grid">
            {renderComparison('Anxiety', preSessionData.anxiety, ratings.anxiety)}
            {renderComparison('Stress', preSessionData.pressure, ratings.pressure)}
            {renderComparison('Fear', preSessionData.fear, ratings.fear)}
            {renderComparison('Mood', preSessionData.mood, ratings.mood)}
            {renderComparison('Tension', preSessionData.tension, ratings.tension)}
          </div>
        </div>

        <button type="submit" className="btn-primary full-width-btn">
          Complete Session
        </button>
      </form>
    </div>
  );
};

export default PostSessionCheckin;