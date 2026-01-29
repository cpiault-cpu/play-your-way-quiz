interface IconProps {
  className?: string;
}

const MoleculeIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="moleculeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F7942" />
        <stop offset="100%" stopColor="#7CB342" />
      </linearGradient>
      <linearGradient id="moleculeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4A574" />
        <stop offset="100%" stopColor="#E8C18A" />
      </linearGradient>
      <filter id="moleculeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2D5016" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    {/* Central carbon atom */}
    <circle cx="60" cy="45" r="14" fill="url(#moleculeGradient1)" filter="url(#moleculeShadow)" />
    <circle cx="60" cy="45" r="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
    <text x="60" y="50" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily="serif">C</text>
    
    {/* Left hydrogen atom */}
    <circle cx="28" cy="85" r="11" fill="url(#moleculeGradient2)" filter="url(#moleculeShadow)" />
    <circle cx="28" cy="85" r="7" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
    <text x="28" y="89" textAnchor="middle" fill="#5D4037" fontSize="10" fontWeight="600" fontFamily="serif">H</text>
    
    {/* Right oxygen atom */}
    <circle cx="92" cy="85" r="13" fill="#8B5A2B" filter="url(#moleculeShadow)" />
    <circle cx="92" cy="85" r="9" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
    <text x="92" y="90" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600" fontFamily="serif">O</text>
    
    {/* Elegant bond lines */}
    <line x1="50" y1="55" x2="35" y2="75" stroke="#4F7942" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    <line x1="70" y1="55" x2="82" y2="73" stroke="#4F7942" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    <line x1="39" y1="85" x2="79" y2="85" stroke="#8B5A2B" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    
    {/* Decorative electron clouds */}
    <ellipse cx="60" cy="45" rx="22" ry="8" fill="none" stroke="#7CB342" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" transform="rotate(-30 60 45)" />
    <ellipse cx="60" cy="45" rx="22" ry="8" fill="none" stroke="#7CB342" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" transform="rotate(30 60 45)" />
    
    {/* Small decorative particles */}
    <circle cx="45" cy="30" r="2" fill="#7CB342" opacity="0.5" />
    <circle cx="78" cy="35" r="1.5" fill="#7CB342" opacity="0.4" />
    <circle cx="55" cy="65" r="1.5" fill="#D4A574" opacity="0.5" />
  </svg>
);

export default MoleculeIcon;
