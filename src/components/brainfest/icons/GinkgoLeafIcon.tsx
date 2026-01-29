const GinkgoLeafIcon = ({ className = "h-20 w-20" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="ginkgoLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9CCC65" />
        <stop offset="40%" stopColor="#8BC34A" />
        <stop offset="100%" stopColor="#7CB342" />
      </linearGradient>
      <filter id="leafShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#558B2F" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Feuille de ginkgo - forme en éventail avec encoche centrale */}
    <path
      d="M50 92 
         L50 55
         C50 55 48 50 45 45
         C40 38 30 30 18 22
         C22 24 28 26 35 26
         C42 26 47 23 50 18
         C53 23 58 26 65 26
         C72 26 78 24 82 22
         C70 30 60 38 55 45
         C52 50 50 55 50 55
         L50 92 Z"
      fill="url(#ginkgoLeafGrad)"
      stroke="#689F38"
      strokeWidth="1"
      filter="url(#leafShadow)"
    />
    
    {/* Encoche centrale caractéristique */}
    <path
      d="M50 18 L50 40"
      stroke="#689F38"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    
    {/* Nervures en éventail - gauche */}
    <path d="M50 55 Q42 42 25 28" stroke="#689F38" strokeWidth="0.7" opacity="0.5" fill="none"/>
    <path d="M50 55 Q44 44 32 32" stroke="#689F38" strokeWidth="0.6" opacity="0.4" fill="none"/>
    <path d="M50 55 Q46 46 38 36" stroke="#689F38" strokeWidth="0.5" opacity="0.35" fill="none"/>
    
    {/* Nervures en éventail - droite */}
    <path d="M50 55 Q58 42 75 28" stroke="#689F38" strokeWidth="0.7" opacity="0.5" fill="none"/>
    <path d="M50 55 Q56 44 68 32" stroke="#689F38" strokeWidth="0.6" opacity="0.4" fill="none"/>
    <path d="M50 55 Q54 46 62 36" stroke="#689F38" strokeWidth="0.5" opacity="0.35" fill="none"/>
    
    {/* Tige */}
    <path
      d="M50 92 L50 55"
      stroke="#795548"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default GinkgoLeafIcon;
