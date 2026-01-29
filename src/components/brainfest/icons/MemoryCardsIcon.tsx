const MemoryCardsIcon = ({ className = "h-20 w-20" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="cardFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4CAF50" />
        <stop offset="100%" stopColor="#2E7D32" />
      </linearGradient>
      <linearGradient id="cardBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1565C0" />
        <stop offset="100%" stopColor="#0D47A1" />
      </linearGradient>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    {/* Grille de cartes 2x2 */}
    
    {/* Carte 1 - retournée (dos bleu) - haut gauche */}
    <g filter="url(#cardShadow)">
      <rect x="8" y="12" width="28" height="34" rx="3" fill="url(#cardBackGrad)" stroke="#0D47A1" strokeWidth="0.5"/>
      <rect x="12" y="16" width="20" height="26" rx="1" fill="none" stroke="#1976D2" strokeWidth="0.8" opacity="0.5"/>
      <text x="22" y="33" textAnchor="middle" fontSize="14" fill="#64B5F6">?</text>
    </g>
    
    {/* Carte 2 - face visible (plante) - haut droite */}
    <g filter="url(#cardShadow)">
      <rect x="42" y="12" width="28" height="34" rx="3" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="0.5"/>
      {/* Mini plante */}
      <path d="M56 38 L56 28 M56 28 C52 25 50 20 54 18 C58 20 56 25 56 28 M56 28 C60 25 62 20 58 18" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="56" cy="22" r="4" fill="#81C784" opacity="0.6"/>
    </g>
    
    {/* Carte 3 - face visible (plante identique) - bas gauche */}
    <g filter="url(#cardShadow)">
      <rect x="8" y="52" width="28" height="34" rx="3" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="0.5"/>
      {/* Mini plante identique */}
      <path d="M22 78 L22 68 M22 68 C18 65 16 60 20 58 C24 60 22 65 22 68 M22 68 C26 65 28 60 24 58" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="22" cy="62" r="4" fill="#81C784" opacity="0.6"/>
    </g>
    
    {/* Carte 4 - retournée (dos bleu) - bas droite */}
    <g filter="url(#cardShadow)">
      <rect x="42" y="52" width="28" height="34" rx="3" fill="url(#cardBackGrad)" stroke="#0D47A1" strokeWidth="0.5"/>
      <rect x="46" y="56" width="20" height="26" rx="1" fill="none" stroke="#1976D2" strokeWidth="0.8" opacity="0.5"/>
      <text x="56" y="73" textAnchor="middle" fontSize="14" fill="#64B5F6">?</text>
    </g>
    
    {/* Indicateur de match - petites étoiles */}
    <circle cx="85" cy="30" r="6" fill="#FFD54F" opacity="0.9"/>
    <text x="85" y="33" textAnchor="middle" fontSize="8" fill="#F57F17">✓</text>
    
    {/* Effet de brillance sur une carte */}
    <path d="M44 14 L48 14 L44 20 Z" fill="white" opacity="0.3"/>
  </svg>
);

export default MemoryCardsIcon;
