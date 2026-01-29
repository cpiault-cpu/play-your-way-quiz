const HealthIcon = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Balance beam (horizontal) */}
    <rect x="15" y="32" width="70" height="6" rx="3" fill="#5BA883" />
    
    {/* Center pivot/stand */}
    <rect x="46" y="35" width="8" height="50" rx="2" fill="#4A7C6F" />
    
    {/* Base */}
    <rect x="30" y="82" width="40" height="8" rx="4" fill="#4A7C6F" />
    
    {/* Left plate holder (chain/rope) */}
    <line x1="22" y1="38" x2="22" y2="52" stroke="#7BC5A0" strokeWidth="3" strokeLinecap="round" />
    <line x1="18" y1="38" x2="26" y2="38" stroke="#7BC5A0" strokeWidth="3" strokeLinecap="round" />
    
    {/* Left plate */}
    <ellipse cx="22" cy="58" rx="16" ry="6" fill="#E8B86D" stroke="#C49A4A" strokeWidth="2" />
    
    {/* Food items on left plate */}
    <circle cx="17" cy="52" r="4" fill="#FF6B6B" /> {/* Apple */}
    <ellipse cx="26" cy="53" rx="5" ry="3" fill="#FFE066" /> {/* Banana */}
    <circle cx="22" cy="50" r="3" fill="#4CAF50" /> {/* Vegetable */}
    
    {/* Right plate holder (chain/rope) */}
    <line x1="78" y1="38" x2="78" y2="52" stroke="#7BC5A0" strokeWidth="3" strokeLinecap="round" />
    <line x1="74" y1="38" x2="82" y2="38" stroke="#7BC5A0" strokeWidth="3" strokeLinecap="round" />
    
    {/* Right plate */}
    <ellipse cx="78" cy="58" rx="16" ry="6" fill="#E8B86D" stroke="#C49A4A" strokeWidth="2" />
    
    {/* Vitamins/supplements on right plate */}
    <ellipse cx="73" cy="52" rx="4" ry="6" fill="#2196F3" transform="rotate(-15 73 52)" /> {/* Pill 1 */}
    <ellipse cx="82" cy="53" rx="4" ry="6" fill="#FF9800" transform="rotate(15 82 53)" /> {/* Pill 2 */}
    <circle cx="78" cy="50" r="3" fill="#9C27B0" /> {/* Round vitamin */}
    
    {/* Decorative leaves on top */}
    <ellipse cx="50" cy="22" rx="8" ry="5" fill="#4CAF50" transform="rotate(-30 50 22)" />
    <ellipse cx="50" cy="22" rx="8" ry="5" fill="#66BB6A" transform="rotate(30 50 22)" />
    <line x1="50" y1="27" x2="50" y2="32" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
    
    {/* Small sparkles */}
    <circle cx="12" cy="42" r="2" fill="#FFD700" />
    <circle cx="88" cy="42" r="2" fill="#FFD700" />
  </svg>
);

export default HealthIcon;
