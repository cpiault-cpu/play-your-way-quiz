const MemoryCardsIcon = ({ className = "h-20 w-20" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Grille 2x2 de cartes */}
    
    {/* Carte 1 - dos vert avec feuille - haut gauche */}
    <g>
      <rect x="5" y="5" width="40" height="40" rx="5" fill="#7BC5A0" stroke="#5BA883" strokeWidth="1"/>
      {/* Feuille stylisée */}
      <ellipse cx="25" cy="18" rx="8" ry="5" fill="#4CAF50" transform="rotate(-30 25 18)"/>
      <ellipse cx="25" cy="18" rx="8" ry="5" fill="#66BB6A" transform="rotate(30 25 18)"/>
      <line x1="25" y1="23" x2="25" y2="38" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round"/>
    </g>
    
    {/* Carte 2 - dos vert avec feuille - haut droite */}
    <g>
      <rect x="55" y="5" width="40" height="40" rx="5" fill="#7BC5A0" stroke="#5BA883" strokeWidth="1"/>
      <ellipse cx="75" cy="18" rx="8" ry="5" fill="#4CAF50" transform="rotate(-30 75 18)"/>
      <ellipse cx="75" cy="18" rx="8" ry="5" fill="#66BB6A" transform="rotate(30 75 18)"/>
      <line x1="75" y1="23" x2="75" y2="38" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round"/>
    </g>
    
    {/* Carte 3 - RÉVÉLÉE (blanche avec plante) - bas gauche */}
    <g>
      <rect x="5" y="55" width="40" height="40" rx="5" fill="#FFFFFF" stroke="#4CAF50" strokeWidth="2"/>
      {/* Gingembre simplifié */}
      <path d="M25 65 C20 72 18 82 22 90 M25 65 C30 72 32 82 28 90 M25 75 C20 78 18 82 20 85" 
            stroke="#D4A24C" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </g>
    
    {/* Carte 4 - dos vert avec feuille - bas droite */}
    <g>
      <rect x="55" y="55" width="40" height="40" rx="5" fill="#7BC5A0" stroke="#5BA883" strokeWidth="1"/>
      <ellipse cx="75" cy="68" rx="8" ry="5" fill="#4CAF50" transform="rotate(-30 75 68)"/>
      <ellipse cx="75" cy="68" rx="8" ry="5" fill="#66BB6A" transform="rotate(30 75 68)"/>
      <line x1="75" y1="73" x2="75" y2="88" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

export default MemoryCardsIcon;
