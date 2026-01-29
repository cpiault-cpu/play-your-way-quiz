interface IconProps {
  className?: string;
}

const PlantIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="plantLeafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7CB342" />
        <stop offset="50%" stopColor="#8BC34A" />
        <stop offset="100%" stopColor="#9CCC65" />
      </linearGradient>
      <linearGradient id="plantStemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#558B2F" />
        <stop offset="100%" stopColor="#33691E" />
      </linearGradient>
      <linearGradient id="flowerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4A574" />
        <stop offset="100%" stopColor="#E8C18A" />
      </linearGradient>
      <filter id="plantShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2D5016" floodOpacity="0.25"/>
      </filter>
    </defs>
    
    {/* Main stem */}
    <path 
      d="M60 110 Q58 85 60 60 Q62 40 60 25" 
      stroke="url(#plantStemGradient)" 
      strokeWidth="4" 
      strokeLinecap="round"
      fill="none"
      filter="url(#plantShadow)"
    />
    
    {/* Left large leaf */}
    <path 
      d="M60 50 Q45 40 30 25 Q25 35 28 48 Q32 58 50 55 Q55 54 60 50Z" 
      fill="url(#plantLeafGradient)"
      filter="url(#plantShadow)"
    />
    <path 
      d="M60 50 Q48 45 38 35" 
      stroke="#558B2F" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
    
    {/* Right large leaf */}
    <path 
      d="M60 65 Q75 55 90 40 Q95 50 92 63 Q88 73 70 70 Q65 69 60 65Z" 
      fill="url(#plantLeafGradient)"
      filter="url(#plantShadow)"
    />
    <path 
      d="M60 65 Q72 60 82 50" 
      stroke="#558B2F" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
    
    {/* Top small leaf */}
    <path 
      d="M60 35 Q52 28 45 18 Q48 28 55 33 Q58 34 60 35Z" 
      fill="url(#plantLeafGradient)"
      opacity="0.9"
    />
    
    {/* Decorative flower/bud at top */}
    <circle cx="60" cy="18" r="8" fill="url(#flowerGradient)" filter="url(#plantShadow)" />
    <circle cx="60" cy="18" r="4" fill="#D4A574" />
    <circle cx="60" cy="18" r="2" fill="#C69C6D" />
    
    {/* Small decorative petals around flower */}
    <ellipse cx="52" cy="16" rx="4" ry="6" fill="#E8C18A" opacity="0.7" transform="rotate(-30 52 16)" />
    <ellipse cx="68" cy="16" rx="4" ry="6" fill="#E8C18A" opacity="0.7" transform="rotate(30 68 16)" />
    <ellipse cx="60" cy="10" rx="4" ry="5" fill="#E8C18A" opacity="0.7" />
    
    {/* Ground/roots suggestion */}
    <ellipse cx="60" cy="108" rx="15" ry="4" fill="#795548" opacity="0.3" />
  </svg>
);

export default PlantIcon;
