import React, { useState } from 'react';

const RatingSlider = ({ label, value, onChange, minLabel = "Low", maxLabel = "High" }) => {
  const [isDragging, setIsDragging] = useState(false);

  // Ensure value stays between 0 and 10
  const safeValue = Math.max(0, Math.min(10, value || 0));
  const percentage = (safeValue / 10) * 100;

  const handleSliderChange = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-3 mb-8 w-full group">
      
      {/* Header (Label & Value Badge) */}
      <div className="flex justify-between items-center">
        <label className="font-bold text-[#2C3E35] text-[15px] leading-tight pr-4">
          {label}
        </label>
        
        {/* Animated Value Badge */}
        <span 
          className={`flex items-center justify-center min-w-[3.5rem] h-8 rounded-xl font-bold text-sm transition-all duration-300 ${
            isDragging 
              ? 'bg-[#4A7C59] text-white scale-110 shadow-md' 
              : 'bg-[#E8F0EA] text-[#4A7C59]'
          }`}
        >
          {safeValue} / 10
        </span>
      </div>
      
      {/* Custom Slider Track & Thumb */}
      <div className="relative w-full h-8 flex items-center">
        {/* Background Track */}
        <div className="absolute left-0 right-0 h-2 bg-[#E2DFD5] rounded-full overflow-hidden">
          {/* Animated Filled Track */}
          <div 
            className="h-full bg-[#4A7C59] transition-all duration-150 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Actual Invisible Input (for accessibility and interaction) */}
        <input 
          type="range" 
          min="0" 
          max="10" 
          value={safeValue} 
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          aria-label={label}
        />

        {/* Custom Thumb (The circle you drag) */}
        <div 
          className={`absolute w-7 h-7 bg-white border-4 border-[#4A7C59] rounded-full shadow-md pointer-events-none z-10 transition-transform duration-200 ${
            isDragging ? 'scale-125 shadow-lg ring-4 ring-[#4A7C59]/20' : 'group-hover:scale-110'
          }`}
          style={{ 
            left: `calc(${percentage}% - 14px)`, // 14px is half the thumb width to center it
            transition: isDragging ? 'transform 0.1s' : 'left 0.15s ease-out, transform 0.2s'
          }}
        />
      </div>
      
      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs font-semibold text-[#607367] uppercase tracking-wider">
        <span>{minLabel} (0)</span>
        <span>{maxLabel} (10)</span>
      </div>
      
    </div>
  );
};

export default RatingSlider;