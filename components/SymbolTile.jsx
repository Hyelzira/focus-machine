import React from 'react';

const SymbolTile = ({ shape, onClick, size = 64, isTarget = false }) => {
  const shapes = {
    circle: <circle cx="50" cy="50" r="35" />,
    square: <rect x="20" y="20" width="60" height="60" rx="8" />,
    diamond: <polygon points="50,15 85,50 50,85 15,50" />,
    triangle: <polygon points="50,15 85,75 15,75" />,
    hexagon: <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" />
  };

  return (
    <button 
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-[1.5rem] transition-all duration-300 ${
        isTarget 
          ? 'bg-white dark:bg-gray-800 border-2 border-[#4A7C59] dark:border-[#A3B18A] shadow-md cursor-default' 
          : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-[#E2DFD5] dark:border-gray-700 shadow-sm hover:shadow-xl hover:scale-110 active:scale-90 hover:border-[#4A7C59] dark:hover:border-[#A3B18A] cursor-pointer'
      }`}
      disabled={isTarget}
    >
      <svg viewBox="0 0 100 100" className="w-[55%] h-[55%]">
        <g className={`transition-colors duration-300 ${isTarget ? 'fill-[#4A7C59] dark:fill-[#A3B18A]' : 'fill-[#607367] dark:fill-gray-400'}`}>
          {shapes[shape] || shapes.circle}
        </g>
      </svg>
    </button>
  );
};

export default SymbolTile;