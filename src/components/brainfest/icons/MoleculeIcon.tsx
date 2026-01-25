interface IconProps {
  className?: string;
}

const MoleculeIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="20" cy="44" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="44" cy="44" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="32" y1="26" x2="24" y2="38" stroke="currentColor" strokeWidth="2" />
    <line x1="32" y1="26" x2="40" y2="38" stroke="currentColor" strokeWidth="2" />
    <line x1="26" y1="44" x2="38" y2="44" stroke="currentColor" strokeWidth="2" />
    <text x="30" y="23" fill="currentColor" fontSize="8" fontWeight="bold">C</text>
    <text x="18" y="47" fill="currentColor" fontSize="8" fontWeight="bold">H</text>
    <text x="42" y="47" fill="currentColor" fontSize="8" fontWeight="bold">O</text>
  </svg>
);

export default MoleculeIcon;
