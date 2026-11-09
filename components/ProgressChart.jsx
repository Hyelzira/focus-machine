import React, { useState, useEffect, useRef } from 'react';

const ProgressChart = ({ data, height = 200 }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const pathRef = useRef(null);

  // 1. Animation Effect: Triggers every time `data` changes
  useEffect(() => {
    if (pathRef.current) {
      // Get the total length of the SVG path
      const length = pathRef.current.getTotalLength();
      
      // Set up the initial state (hidden)
      pathRef.current.style.transition = 'none';
      pathRef.current.style.strokeDasharray = `${length} ${length}`;
      pathRef.current.style.strokeDashoffset = length;

      // Force a browser reflow to ensure the initial state is applied
      pathRef.current.getBoundingClientRect();

      // Animate to the final state (visible)
      pathRef.current.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
      pathRef.current.style.strokeDashoffset = '0';
    }
  }, [data]);

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-48 text-[#607367] italic">Not enough data yet.</div>;
  }

  const width = 600;
  const paddingX = 20;
  const paddingY = 30;
  const maxVal = 10;
  
  // Calculate coordinates
  const points = data.map((val, index) => {
    const x = paddingX + (index / (data.length - 1 || 1)) * (width - paddingX * 2);
    const y = height - paddingY - (val / maxVal) * (height - paddingY * 2);
    return { x, y, val };
  });

  // Generate smooth bezier curve path
  const pathData = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = a[i - 1];
    const cpX1 = prev.x + (point.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (point.x - prev.x) / 2;
    const cpY2 = point.y;
    return `${acc} C ${cpX1},${cpY1} ${cpX2},${cpY2} ${point.x},${point.y}`;
  }, '');

  return (
    <div className="relative w-full overflow-visible mt-6">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 5, 10].map((val) => {
          const y = height - paddingY - (val / maxVal) * (height - paddingY * 2);
          return (
            <g key={val}>
              <line x1={0} y1={y} x2={width} y2={y} stroke="#E2DFD5" strokeWidth="1" strokeDasharray="4 4" />
              <text x={0} y={y - 8} fill="#A0AAB2" fontSize="10" fontWeight="bold">{val}</text>
            </g>
          );
        })}

        {/* Gradient Fill (Fades in) */}
        <path 
          d={`${pathData} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`} 
          fill="url(#chartGradient)" 
          className="animate-[fadeIn_1.5s_ease-in-out]"
        />

        {/* The Animated Smooth Line */}
        <path 
          ref={pathRef}
          d={pathData} 
          fill="none" 
          stroke="#4A7C59" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Interactive Dots */}
        {points.map((point, i) => (
          <g 
            key={i} 
            onMouseEnter={() => setHoveredIndex(i)} 
            onMouseLeave={() => setHoveredIndex(null)}
            className="animate-[fadeIn_1s_ease-in-out]"
          >
            {/* Invisible larger hover target */}
            <circle cx={point.x} cy={point.y} r="15" fill="transparent" className="cursor-pointer" />
            
            {/* The visible dot */}
            <circle 
              cx={point.x} 
              cy={point.y} 
              r={hoveredIndex === i ? "6" : "4"} 
              fill={hoveredIndex === i ? "#4A7C59" : "#FFFFFF"} 
              stroke="#4A7C59" 
              strokeWidth="2.5" 
              className="transition-all duration-200"
            />
            
            {/* Tooltip */}
            {hoveredIndex === i && (
              <g className="pointer-events-none drop-shadow-md">
                <rect 
                  x={point.x - 18} 
                  y={point.y - 38} 
                  width="36" 
                  height="24" 
                  rx="6" 
                  fill="#2C3E35" 
                />
                {/* Tiny triangle pointer */}
                <polygon 
                  points={`${point.x},${point.y - 14} ${point.x - 4},${point.y - 18} ${point.x + 4},${point.y - 18}`} 
                  fill="#2C3E35" 
                />
                <text 
                  x={point.x} 
                  y={point.y - 22} 
                  fill="#FFF" 
                  fontSize="11" 
                  fontWeight="bold" 
                  textAnchor="middle"
                >
                  {point.val}/10
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Add a simple CSS keyframe for the fade-in effect directly inside the component style block */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default ProgressChart;