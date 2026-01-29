const HealthIcon = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Heart shape representing health */}
    <path 
      d="M50 85 C20 60 10 40 20 28 C30 16 45 20 50 30 C55 20 70 16 80 28 C90 40 80 60 50 85Z"
      fill="#E8453C"
      stroke="#C23B34"
      strokeWidth="2"
    />
    
    {/* Cross/Plus symbol inside heart */}
    <rect x="45" y="38" width="10" height="30" rx="2" fill="white"/>
    <rect x="35" y="48" width="30" height="10" rx="2" fill="white"/>
    
    {/* Small pulse line at bottom */}
    <path 
      d="M25 75 L35 75 L38 70 L42 80 L46 65 L50 78 L54 75 L75 75"
      stroke="#4CAF50"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Small vitamin pills decorations */}
    <ellipse cx="18" cy="50" rx="5" ry="8" fill="#FF9800" transform="rotate(-20 18 50)"/>
    <ellipse cx="82" cy="50" rx="5" ry="8" fill="#2196F3" transform="rotate(20 82 50)"/>
    
    {/* Sparkle effects */}
    <circle cx="30" cy="25" r="2" fill="#FFD700"/>
    <circle cx="70" cy="25" r="2" fill="#FFD700"/>
    <circle cx="50" cy="15" r="2.5" fill="#FFD700"/>
  </svg>
);

export default HealthIcon;
