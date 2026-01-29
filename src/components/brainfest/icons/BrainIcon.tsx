interface IconProps {
  className?: string;
}

const BrainIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brainGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7CB342" />
        <stop offset="100%" stopColor="#8BC34A" />
      </linearGradient>
      <linearGradient id="brainGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9CCC65" />
        <stop offset="100%" stopColor="#AED581" />
      </linearGradient>
      <filter id="brainShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2D5016" floodOpacity="0.25"/>
      </filter>
    </defs>
    
    {/* Left hemisphere */}
    <path 
      d="M58 25 
         Q35 28 28 45 
         Q22 58 25 72 
         Q28 88 45 95 
         Q55 98 58 95" 
      fill="url(#brainGradient1)"
      stroke="#558B2F"
      strokeWidth="2"
      filter="url(#brainShadow)"
    />
    
    {/* Right hemisphere */}
    <path 
      d="M62 25 
         Q85 28 92 45 
         Q98 58 95 72 
         Q92 88 75 95 
         Q65 98 62 95" 
      fill="url(#brainGradient2)"
      stroke="#558B2F"
      strokeWidth="2"
      filter="url(#brainShadow)"
    />
    
    {/* Central dividing line */}
    <path d="M60 28 L60 92" stroke="#558B2F" strokeWidth="2" strokeLinecap="round" />
    
    {/* Left brain folds/gyri */}
    <path d="M35 45 Q42 42 48 48" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M30 58 Q40 52 50 60" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M32 72 Q42 65 52 72" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M38 82 Q46 78 54 84" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.6" />
    
    {/* Right brain folds/gyri */}
    <path d="M85 45 Q78 42 72 48" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M90 58 Q80 52 70 60" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M88 72 Q78 65 68 72" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M82 82 Q74 78 66 84" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.6" />
    
    {/* Top brain curve details */}
    <path d="M45 32 Q50 28 55 32" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M65 32 Q70 28 75 32" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.5" />
    
    {/* Neural connection sparkles */}
    <circle cx="40" cy="50" r="2" fill="#D4A574" opacity="0.7" />
    <circle cx="80" cy="50" r="2" fill="#D4A574" opacity="0.7" />
    <circle cx="35" cy="65" r="1.5" fill="#D4A574" opacity="0.5" />
    <circle cx="85" cy="65" r="1.5" fill="#D4A574" opacity="0.5" />
    <circle cx="45" cy="78" r="1.5" fill="#D4A574" opacity="0.6" />
    <circle cx="75" cy="78" r="1.5" fill="#D4A574" opacity="0.6" />
    
    {/* Stem/brainstem suggestion */}
    <path d="M55 95 Q60 102 65 95" stroke="#558B2F" strokeWidth="2" fill="none" />
    <ellipse cx="60" cy="100" rx="8" ry="5" fill="url(#brainGradient1)" opacity="0.8" />
  </svg>
);

export default BrainIcon;
