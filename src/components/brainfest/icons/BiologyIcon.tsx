interface IconProps {
  className?: string;
}

const BiologyIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7CB342" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#8BC34A" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id="nucleusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F7942" />
        <stop offset="100%" stopColor="#7CB342" />
      </linearGradient>
      <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D4A574" />
        <stop offset="50%" stopColor="#E8C18A" />
        <stop offset="100%" stopColor="#D4A574" />
      </linearGradient>
      <filter id="bioShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2D5016" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    {/* Outer cell membrane */}
    <ellipse cx="60" cy="60" rx="48" ry="38" fill="url(#cellGradient)" stroke="#7CB342" strokeWidth="2.5" filter="url(#bioShadow)" />
    
    {/* Inner membrane detail */}
    <ellipse cx="60" cy="60" rx="42" ry="32" fill="none" stroke="#8BC34A" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
    
    {/* Nucleus */}
    <ellipse cx="60" cy="60" rx="18" ry="14" fill="url(#nucleusGradient)" filter="url(#bioShadow)" />
    <ellipse cx="60" cy="60" rx="14" ry="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
    
    {/* Nucleolus */}
    <circle cx="60" cy="58" r="5" fill="#33691E" />
    <circle cx="58" cy="56" r="1.5" fill="#fff" opacity="0.4" />
    
    {/* DNA double helix suggestion inside nucleus */}
    <path d="M52 55 Q56 52 60 55 Q64 58 68 55" stroke="#9CCC65" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M52 62 Q56 65 60 62 Q64 59 68 62" stroke="#9CCC65" strokeWidth="1.5" fill="none" opacity="0.6" />
    
    {/* Mitochondria */}
    <ellipse cx="28" cy="50" rx="10" ry="6" fill="#8BC34A" transform="rotate(-20 28 50)" filter="url(#bioShadow)" />
    <path d="M22 48 Q25 52 28 48 Q31 44 34 48" stroke="#558B2F" strokeWidth="1" fill="none" opacity="0.6" />
    
    <ellipse cx="88" cy="70" rx="9" ry="5" fill="#8BC34A" transform="rotate(25 88 70)" filter="url(#bioShadow)" />
    <path d="M82 69 Q85 72 88 69 Q91 66 94 69" stroke="#558B2F" strokeWidth="1" fill="none" opacity="0.6" />
    
    {/* Endoplasmic reticulum suggestion */}
    <path d="M35 75 Q40 70 45 75 Q50 80 55 75" stroke="#7CB342" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M65 45 Q70 40 75 45 Q80 50 85 45" stroke="#7CB342" strokeWidth="1.5" fill="none" opacity="0.5" />
    
    {/* Ribosomes - small dots */}
    <circle cx="40" cy="55" r="2" fill="#D4A574" opacity="0.7" />
    <circle cx="45" cy="48" r="1.5" fill="#D4A574" opacity="0.6" />
    <circle cx="78" cy="55" r="2" fill="#D4A574" opacity="0.7" />
    <circle cx="72" cy="48" r="1.5" fill="#D4A574" opacity="0.6" />
    <circle cx="50" cy="72" r="1.5" fill="#D4A574" opacity="0.5" />
    <circle cx="70" cy="72" r="1.5" fill="#D4A574" opacity="0.5" />
    
    {/* Vesicles */}
    <circle cx="35" cy="40" r="4" fill="#9CCC65" opacity="0.6" />
    <circle cx="82" cy="45" r="3" fill="#9CCC65" opacity="0.5" />
  </svg>
);

export default BiologyIcon;
