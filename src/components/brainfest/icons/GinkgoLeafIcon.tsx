const GinkgoLeafIcon = ({ className = "h-20 w-20" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="ginkgoGradientNew" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#A8D08D" />
        <stop offset="30%" stopColor="#8BC34A" />
        <stop offset="60%" stopColor="#7CB342" />
        <stop offset="100%" stopColor="#689F38" />
      </linearGradient>
      <linearGradient id="ginkgoStemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8D6E63" />
        <stop offset="100%" stopColor="#6D4C41" />
      </linearGradient>
      <filter id="ginkgoShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#33691E" floodOpacity="0.25"/>
      </filter>
    </defs>
    
    {/* Left fan lobe */}
    <path
      d="M50 88 
         C50 88 48 65 46 55
         C44 45 35 35 20 25
         C25 28 32 30 40 28
         C45 27 48 24 50 20"
      fill="url(#ginkgoGradientNew)"
      stroke="#558B2F"
      strokeWidth="0.8"
      filter="url(#ginkgoShadow)"
    />
    
    {/* Right fan lobe */}
    <path
      d="M50 88 
         C50 88 52 65 54 55
         C56 45 65 35 80 25
         C75 28 68 30 60 28
         C55 27 52 24 50 20"
      fill="url(#ginkgoGradientNew)"
      stroke="#558B2F"
      strokeWidth="0.8"
      filter="url(#ginkgoShadow)"
    />
    
    {/* Central notch fill to connect lobes */}
    <path
      d="M46 55 C48 45 50 35 50 20 C50 35 52 45 54 55 C52 60 50 70 50 88 C50 70 48 60 46 55"
      fill="url(#ginkgoGradientNew)"
    />
    
    {/* Elegant vein pattern - left side */}
    <path
      d="M50 75 C45 60 38 48 28 35"
      stroke="#558B2F"
      strokeWidth="0.6"
      strokeLinecap="round"
      opacity="0.5"
      fill="none"
    />
    <path
      d="M50 65 C46 55 42 47 35 40"
      stroke="#558B2F"
      strokeWidth="0.5"
      strokeLinecap="round"
      opacity="0.4"
      fill="none"
    />
    <path
      d="M50 55 C48 48 45 42 40 36"
      stroke="#558B2F"
      strokeWidth="0.4"
      strokeLinecap="round"
      opacity="0.35"
      fill="none"
    />
    
    {/* Elegant vein pattern - right side */}
    <path
      d="M50 75 C55 60 62 48 72 35"
      stroke="#558B2F"
      strokeWidth="0.6"
      strokeLinecap="round"
      opacity="0.5"
      fill="none"
    />
    <path
      d="M50 65 C54 55 58 47 65 40"
      stroke="#558B2F"
      strokeWidth="0.5"
      strokeLinecap="round"
      opacity="0.4"
      fill="none"
    />
    <path
      d="M50 55 C52 48 55 42 60 36"
      stroke="#558B2F"
      strokeWidth="0.4"
      strokeLinecap="round"
      opacity="0.35"
      fill="none"
    />
    
    {/* Central vein */}
    <path
      d="M50 20 L50 50"
      stroke="#558B2F"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.6"
    />
    
    {/* Stem */}
    <path
      d="M50 88 C50 88 49 92 50 95 C51 92 50 88 50 88"
      fill="url(#ginkgoStemGradient)"
    />
    <line
      x1="50"
      y1="88"
      x2="50"
      y2="98"
      stroke="url(#ginkgoStemGradient)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    
    {/* Subtle highlight on left lobe */}
    <path
      d="M35 35 C38 40 42 45 45 55"
      stroke="#C5E1A5"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
      fill="none"
    />
    
    {/* Subtle highlight on right lobe */}
    <path
      d="M65 35 C62 40 58 45 55 55"
      stroke="#C5E1A5"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
      fill="none"
    />
  </svg>
);

export default GinkgoLeafIcon;
