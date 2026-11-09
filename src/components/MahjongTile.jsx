import React from 'react';

const MahjongTile = ({ type, size = 80, onClick, isSelected }) => {
  // A collection of custom Mahjong-style SVG designs
  const tiles = {
    // Circles (Dots) suit
    circle1: (
      <g fill="#4A7C59">
        <circle cx="50" cy="50" r="25" />
        <circle cx="50" cy="50" r="15" fill="#FAF9F6" />
        <circle cx="50" cy="50" r="8" fill="#4A7C59" />
      </g>
    ),
    circle2: (
      <g fill="#4A7C59">
        <circle cx="50" cy="30" r="15" />
        <circle cx="50" cy="70" r="15" />
      </g>
    ),
    circle3: (
      <g fill="#4A7C59">
        <circle cx="50" cy="25" r="12" />
        <circle cx="35" cy="60" r="12" />
        <circle cx="65" cy="60" r="12" />
      </g>
    ),
    
    // Bamboo suit
    bamboo1: (
      <g fill="#2E5A3B" stroke="#FAF9F6" strokeWidth="2">
        <rect x="45" y="20" width="10" height="60" rx="4" />
        <line x1="45" y1="40" x2="55" y2="40" />
        <line x1="45" y1="60" x2="55" y2="60" />
      </g>
    ),
    bamboo2: (
      <g fill="#2E5A3B">
        <rect x="30" y="30" width="8" height="40" rx="4" />
        <rect x="62" y="30" width="8" height="40" rx="4" />
      </g>
    ),

    // Characters suit
    character1: (
      <g fill="#B23A48" textAnchor="middle" fontFamily="serif">
        <text x="50" y="45" fontSize="30" fontWeight="bold">一</text>
        <text x="50" y="75" fontSize="30" fontWeight="bold">萬</text>
      </g>
    ),
    
    // Winds
    east: (
      <g fill="#2C3E35" textAnchor="middle" fontFamily="serif">
        <text x="50" y="60" fontSize="40" fontWeight="bold">東</text>
      </g>
    ),
    south: (
      <g fill="#2C3E35" textAnchor="middle" fontFamily="serif">
        <text x="50" y="60" fontSize="40" fontWeight="bold">南</text>
      </g>
    ),

    // Dragons
    red: (
      <g fill="#B23A48" textAnchor="middle" fontFamily="serif">
        <text x="50" y="60" fontSize="40" fontWeight="bold">中</text>
      </g>
    ),
    green: (
      <g fill="#4A7C59" textAnchor="middle" fontFamily="serif">
        <text x="50" y="60" fontSize="40" fontWeight="bold">發</text>
      </g>
    ),
  };

  return (
    <button 
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-2xl transition-all duration-300 ${
        onClick 
          ? 'bg-[#FFFDF5] border-2 border-[#D4C9B8] shadow-md hover:scale-105 active:scale-95 cursor-pointer hover:border-[#4A7C59]' 
          : 'bg-[#FFFDF5] border-2 border-[#4A7C59] shadow-lg cursor-default'
      }`}
      disabled={!onClick}
    >
      <svg viewBox="0 0 100 100" className="w-[85%] h-[85%]">
        {tiles[type] || tiles.circle1}
      </svg>
    </button>
  );
};

export default MahjongTile;