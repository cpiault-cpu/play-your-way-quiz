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
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.15"/>
      </filter>
    </defs>
    
    {/* Grille 4x2 de cartes comme dans le jeu */}
    
    {/* Rangée 1 */}
    {/* Carte 1 - dos vert avec feuille */}
    <g filter="url(#cardShadowMem)">
      <rect x="4" y="8" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(8, 14)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
    
    {/* Carte 2 - dos vert avec feuille */}
    <g filter="url(#cardShadowMem)">
      <rect x="28" y="8" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(32, 14)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
    
    {/* Carte 3 - dos vert avec feuille */}
    <g filter="url(#cardShadowMem)">
      <rect x="52" y="8" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(56, 14)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
    
    {/* Carte 4 - dos vert avec feuille */}
    <g filter="url(#cardShadowMem)">
      <rect x="76" y="8" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(80, 14)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
    
    {/* Rangée 2 */}
    {/* Carte 5 - dos vert avec feuille */}
    <g filter="url(#cardShadowMem)">
      <rect x="4" y="40" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(8, 46)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
    
    {/* Carte 6 - RÉVÉLÉE (blanche avec gingembre) */}
    <g filter="url(#cardShadowMem)">
      <rect x="28" y="40" width="20" height="26" rx="3" fill="#FFFFFF" stroke="#4CAF50" strokeWidth="1.5"/>
      {/* Gingembre stylisé */}
      <path d="M38 48 C36 50 35 54 36 58 C37 56 39 55 40 57 C41 55 40 52 38 48" fill="#E8C07D" stroke="#C9A050" strokeWidth="0.5"/>
      <text x="38" y="64" textAnchor="middle" fontSize="3.5" fill="#666" fontFamily="sans-serif">Gingembre</text>
    </g>
    
    {/* Carte 7 - dos vert avec feuille */}
    <g filter="url(#cardShadowMem)">
      <rect x="52" y="40" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(56, 46)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
    
    {/* Carte 8 - dos vert avec feuille */}
    <g filter="url(#cardShadowMem)">
      <rect x="76" y="40" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(80, 46)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
    
    {/* Rangée 3 - optionnelle pour montrer plus de cartes */}
    <g filter="url(#cardShadowMem)">
      <rect x="4" y="72" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(8, 78)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
    
    <g filter="url(#cardShadowMem)">
      <rect x="28" y="72" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(32, 78)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
    
    <g filter="url(#cardShadowMem)">
      <rect x="52" y="72" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(56, 78)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
    
    <g filter="url(#cardShadowMem)">
      <rect x="76" y="72" width="20" height="26" rx="3" fill="url(#cardBackGreen)"/>
      <g transform="translate(80, 78)">
        <path d="M6 12 L6 8 M4 6 C4 4 5 3 6 4 C7 3 8 4 8 6 M3 8 C2 7 3 5 5 6 M9 8 C10 7 9 5 7 6" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>
    </g>
  </svg>
);

export default MemoryCardsIcon;
