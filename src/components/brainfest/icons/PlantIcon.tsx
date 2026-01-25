interface IconProps {
  className?: string;
}

const PlantIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M32 56V32" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M32 32C32 32 24 28 20 20C16 12 20 8 28 12C36 16 32 32 32 32Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
    />
    <path 
      d="M32 40C32 40 40 36 44 28C48 20 44 16 36 20C28 24 32 40 32 40Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
    />
    <path 
      d="M28 12C28 12 32 16 32 20" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M36 20C36 20 34 26 32 30" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

export default PlantIcon;
