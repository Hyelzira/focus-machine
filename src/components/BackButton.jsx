import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // If there is history, go back. Otherwise, go home.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button 
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm font-bold text-[#607367] dark:text-gray-400 hover:text-[#4A7C59] dark:hover:text-[#A3B18A] transition-colors mb-6 group"
    >
      <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
      Back
    </button>
  );
};

export default BackButton;