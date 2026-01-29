interface IconProps {
  className?: string;
}

const MitochondriaIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="mitoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="50%" stopColor="#FF8E53" />
        <stop offset="100%" stopColor="#FFA07A" />
      </linearGradient>
      <linearGradient id="mitoInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD93D" />
        <stop offset="100%" stopColor="#FF6B6B" />
      </linearGradient>
    </defs>
    
    {/* Outer membrane - bean shape */}
    <ellipse 
      cx="50" 
      cy="50" 
      rx="40" 
      ry="25" 
      fill="url(#mitoGradient)" 
      stroke="#E55A4E" 
      strokeWidth="2"
      transform="rotate(-15 50 50)"
    />
    
    {/* Inner membrane with cristae (folds) */}
    <path 
      d="M20 50 Q30 35 40 50 Q50 65 60 50 Q70 35 80 50" 
      stroke="url(#mitoInner)" 
      strokeWidth="3" 
      fill="none"
      strokeLinecap="round"
    />
    <path 
      d="M25 45 Q35 55 45 45 Q55 35 65 45 Q75 55 80 45" 
      stroke="url(#mitoInner)" 
      strokeWidth="2.5" 
      fill="none"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path 
      d="M22 55 Q32 45 42 55 Q52 65 62 55 Q72 45 78 55" 
      stroke="url(#mitoInner)" 
      strokeWidth="2.5" 
      fill="none"
      strokeLinecap="round"
      opacity="0.8"
    />
    
    {/* ATP molecules representation - small circles */}
    <circle cx="30" cy="40" r="3" fill="#FFD93D" opacity="0.9" />
    <circle cx="45" cy="58" r="2.5" fill="#FFD93D" opacity="0.8" />
    <circle cx="60" cy="42" r="3" fill="#FFD93D" opacity="0.9" />
    <circle cx="70" cy="55" r="2" fill="#FFD93D" opacity="0.7" />
    
    {/* DNA circle inside (mtDNA) */}
    <circle cx="50" cy="50" r="6" fill="none" stroke="#E55A4E" strokeWidth="2" strokeDasharray="2 2" />
    
    {/* Energy burst effects */}
    <circle cx="35" cy="35" r="1.5" fill="#fff" opacity="0.6" />
    <circle cx="65" cy="38" r="1.5" fill="#fff" opacity="0.6" />
    <circle cx="55" cy="62" r="1.5" fill="#fff" opacity="0.6" />
  </svg>
);

export default MitochondriaIcon;
