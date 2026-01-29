interface IconProps {
  className?: string;
}

const MusicIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="musicGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F7942" />
        <stop offset="100%" stopColor="#7CB342" />
      </linearGradient>
      <linearGradient id="musicGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4A574" />
        <stop offset="100%" stopColor="#E8C18A" />
      </linearGradient>
      <filter id="musicShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2D5016" floodOpacity="0.25"/>
      </filter>
    </defs>
    
    {/* Treble clef stylized */}
    <path 
      d="M55 95 
         Q45 85 50 70 
         Q55 55 60 45 
         Q65 35 60 25 
         Q55 18 48 22 
         Q42 28 48 35 
         Q55 42 55 55 
         Q55 68 45 80 
         Q38 88 45 95 
         Q52 102 60 98" 
      stroke="url(#musicGradient1)" 
      strokeWidth="5" 
      strokeLinecap="round"
      fill="none"
      filter="url(#musicShadow)"
    />
    
    {/* Music note heads */}
    <ellipse cx="75" cy="40" rx="10" ry="7" fill="url(#musicGradient2)" transform="rotate(-15 75 40)" filter="url(#musicShadow)" />
    <ellipse cx="85" cy="55" rx="10" ry="7" fill="url(#musicGradient2)" transform="rotate(-15 85 55)" filter="url(#musicShadow)" />
    
    {/* Note stems */}
    <line x1="83" y1="35" x2="83" y2="15" stroke="#4F7942" strokeWidth="3" strokeLinecap="round" />
    <line x1="93" y1="50" x2="93" y2="30" stroke="#4F7942" strokeWidth="3" strokeLinecap="round" />
    
    {/* Connecting beam */}
    <path d="M83 15 L93 30" stroke="#4F7942" strokeWidth="4" strokeLinecap="round" />
    <path d="M83 20 L93 35" stroke="#4F7942" strokeWidth="4" strokeLinecap="round" />
    
    {/* Decorative sound waves */}
    <path d="M20 50 Q25 45 20 40" stroke="#7CB342" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
    <path d="M15 55 Q22 47 15 38" stroke="#7CB342" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
    <path d="M10 60 Q20 48 10 35" stroke="#7CB342" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.2" />
    
    {/* Small decorative notes */}
    <circle cx="100" cy="75" r="4" fill="#9CCC65" opacity="0.5" />
    <line x1="104" y1="75" x2="104" y2="65" stroke="#9CCC65" strokeWidth="1.5" opacity="0.5" />
    
    <circle cx="28" cy="85" r="3" fill="#9CCC65" opacity="0.4" />
    <line x1="31" y1="85" x2="31" y2="78" stroke="#9CCC65" strokeWidth="1.5" opacity="0.4" />
    
    {/* Musical staff lines suggestion */}
    <line x1="65" y1="78" x2="110" y2="78" stroke="#8BC34A" strokeWidth="1" opacity="0.3" />
    <line x1="68" y1="85" x2="108" y2="85" stroke="#8BC34A" strokeWidth="1" opacity="0.3" />
    <line x1="70" y1="92" x2="105" y2="92" stroke="#8BC34A" strokeWidth="1" opacity="0.3" />
  </svg>
);

export default MusicIcon;
