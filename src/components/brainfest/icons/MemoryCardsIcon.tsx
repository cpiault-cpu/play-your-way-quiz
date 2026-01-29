const MemoryCardsIcon = ({ className = "h-20 w-20" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="cardBackGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8ECFB3" />
        <stop offset="100%" stopColor="#6BB89D" />
      </linearGradient>
      <filter id="cardShadowMem" x="-5%" y="-5%" width="110%" height="115%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    {/* Grille 2x2 de cartes - plus grande et visible */}
    
    {/* Carte 1 - dos vert avec feuille - haut gauche */}
    <g filter="url(#cardShadowMem)">
      <rect x="5" y="5" width="40" height="40" rx="5" fill="url(#cardBackGreen)"/>
      {/* Feuille stylisée */}
      <g transform="translate(15, 12)">
        <ellipse cx="10" cy="8" rx="6" ry="4" fill="#4CAF50" transform="rotate(-30 10 8)"/>
        <ellipse cx="10" cy="8" rx="6" ry="4" fill="#66BB6A" transform="rotate(30 10 8)"/>
        <line x1="10" y1="12" x2="10" y2="22" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </g>
    
    {/* Carte 2 - dos vert avec feuille - haut droite */}
    <g filter="url(#cardShadowMem)">
      <rect x="55" y="5" width="40" height="40" rx="5" fill="url(#cardBackGreen)"/>
      <g transform="translate(65, 12)">
        <ellipse cx="10" cy="8" rx="6" ry="4" fill="#4CAF50" transform="rotate(-30 10 8)"/>
        <ellipse cx="10" cy="8" rx="6" ry="4" fill="#66BB6A" transform="rotate(30 10 8)"/>
        <line x1="10" y1="12" x2="10" y2="22" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </g>
    
    {/* Carte 3 - RÉVÉLÉE (blanche avec plante) - bas gauche */}
    <g filter="url(#cardShadowMem)">
      <rect x="5" y="55" width="40" height="40" rx="5" fill="#FFFFFF" stroke="#4CAF50" strokeWidth="2"/>
      {/* Gingembre */}
      <path d="M25 65 C22 70 20 78 23 85 C25 80 28 78 30 82 C32 78 30 72 25 65" fill="#E8B86D" stroke="#C49A4A" strokeWidth="1"/>
    </g>
    
    {/* Carte 4 - dos vert avec feuille - bas droite */}
    <g filter="url(#cardShadowMem)">
      <rect x="55" y="55" width="40" height="40" rx="5" fill="url(#cardBackGreen)"/>
      <g transform="translate(65, 62)">
        <ellipse cx="10" cy="8" rx="6" ry="4" fill="#4CAF50" transform="rotate(-30 10 8)"/>
        <ellipse cx="10" cy="8" rx="6" ry="4" fill="#66BB6A" transform="rotate(30 10 8)"/>
        <line x1="10" y1="12" x2="10" y2="22" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </g>
  </svg>
);

export default MemoryCardsIcon;
