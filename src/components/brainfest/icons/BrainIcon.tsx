interface IconProps {
  className?: string;
}

const BrainIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left hemisphere */}
    <path 
      d="M32 12C26 12 22 16 20 20C16 20 12 24 12 30C12 36 14 40 18 42C18 48 22 52 28 52C30 52 32 51 32 51" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none"
    />
    {/* Right hemisphere */}
    <path 
      d="M32 12C38 12 42 16 44 20C48 20 52 24 52 30C52 36 50 40 46 42C46 48 42 52 36 52C34 52 32 51 32 51" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none"
    />
    {/* Center line */}
    <path 
      d="M32 12V51" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    {/* Brain wrinkles left */}
    <path 
      d="M20 28C22 28 24 30 24 32C24 34 22 36 20 36" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M24 38C26 38 28 40 28 42" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
    />
    {/* Brain wrinkles right */}
    <path 
      d="M44 28C42 28 40 30 40 32C40 34 42 36 44 36" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M40 38C38 38 36 40 36 42" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
    />
    {/* Sparkles for memory */}
    <circle cx="18" cy="18" r="1.5" fill="currentColor" />
    <circle cx="46" cy="18" r="1.5" fill="currentColor" />
    <circle cx="52" cy="38" r="1" fill="currentColor" />
    <circle cx="12" cy="38" r="1" fill="currentColor" />
  </svg>
);

export default BrainIcon;
