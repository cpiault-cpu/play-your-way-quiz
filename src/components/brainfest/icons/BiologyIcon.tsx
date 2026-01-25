interface IconProps {
  className?: string;
}

const BiologyIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="32" rx="20" ry="12" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="32" cy="32" r="2" fill="currentColor" />
    <path d="M12 32C12 32 20 20 32 20C44 20 52 32 52 32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M12 32C12 32 20 44 32 44C44 44 52 32 52 32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    <circle cx="18" cy="26" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="46" cy="38" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="24" cy="40" r="1.5" fill="currentColor" opacity="0.5" />
    <circle cx="40" cy="24" r="1.5" fill="currentColor" opacity="0.5" />
  </svg>
);

export default BiologyIcon;
