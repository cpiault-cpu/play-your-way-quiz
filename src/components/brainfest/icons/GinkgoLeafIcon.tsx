const GinkgoLeafIcon = ({ className = "h-20 w-20" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ginkgo biloba leaf - fan-shaped with characteristic notch */}
    <defs>
      <linearGradient id="ginkgoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7CB342" />
        <stop offset="50%" stopColor="#8BC34A" />
        <stop offset="100%" stopColor="#9CCC65" />
      </linearGradient>
    </defs>
    
    {/* Main leaf shape */}
    <path
      d="M50 95 
         C50 95 48 70 48 55
         C48 40 30 25 15 15
         C25 20 35 18 45 15
         C48 14 50 12 50 10
         C50 12 52 14 55 15
         C65 18 75 20 85 15
         C70 25 52 40 52 55
         C52 70 50 95 50 95Z"
      fill="url(#ginkgoGradient)"
      stroke="#558B2F"
      strokeWidth="1.5"
    />
    
    {/* Center notch characteristic of ginkgo */}
    <path
      d="M50 10 L50 35"
      stroke="#558B2F"
      strokeWidth="1"
      strokeLinecap="round"
    />
    
    {/* Leaf veins - radiating pattern */}
    <path
      d="M50 55 C45 45 35 35 25 25"
      stroke="#558B2F"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M50 55 C55 45 65 35 75 25"
      stroke="#558B2F"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M50 55 C47 42 40 32 32 22"
      stroke="#558B2F"
      strokeWidth="0.6"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M50 55 C53 42 60 32 68 22"
      stroke="#558B2F"
      strokeWidth="0.6"
      strokeLinecap="round"
      opacity="0.4"
    />
    
    {/* Stem */}
    <path
      d="M50 95 L50 55"
      stroke="#795548"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default GinkgoLeafIcon;
