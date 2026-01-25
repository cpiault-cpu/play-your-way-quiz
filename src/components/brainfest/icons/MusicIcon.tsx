interface IconProps {
  className?: string;
}

const MusicIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="18" cy="48" rx="8" ry="6" stroke="currentColor" strokeWidth="2" fill="none" />
    <ellipse cx="42" cy="44" rx="8" ry="6" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M26 48V16L50 12V44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26 24L50 20" stroke="currentColor" strokeWidth="2" />
    <circle cx="38" cy="22" r="2" fill="currentColor" />
    <circle cx="32" cy="30" r="1.5" fill="currentColor" />
  </svg>
);

export default MusicIcon;
