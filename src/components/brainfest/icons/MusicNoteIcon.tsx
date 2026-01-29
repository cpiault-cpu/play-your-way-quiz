const MusicNoteIcon = ({ className = "h-20 w-20" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="musicNoteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
      <linearGradient id="speakerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
      <filter id="musicShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#7C3AED" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Music note - positioned left */}
    <g filter="url(#musicShadow)">
      {/* Note head 1 */}
      <ellipse
        cx="25"
        cy="70"
        rx="10"
        ry="7"
        fill="url(#musicNoteGradient)"
        transform="rotate(-20 25 70)"
      />
      {/* Stem 1 */}
      <rect
        x="33"
        y="22"
        width="4"
        height="48"
        fill="url(#musicNoteGradient)"
        rx="2"
      />
      
      {/* Note head 2 */}
      <ellipse
        cx="50"
        cy="62"
        rx="10"
        ry="7"
        fill="url(#musicNoteGradient)"
        transform="rotate(-20 50 62)"
      />
      {/* Stem 2 */}
      <rect
        x="58"
        y="14"
        width="4"
        height="48"
        fill="url(#musicNoteGradient)"
        rx="2"
      />
      
      {/* Beam connecting the notes */}
      <path
        d="M33 22 L62 14 L62 22 L33 30 Z"
        fill="url(#musicNoteGradient)"
      />
      <path
        d="M33 32 L62 24 L62 32 L33 40 Z"
        fill="url(#musicNoteGradient)"
      />
    </g>
    
    {/* Speaker - positioned bottom right, not overlapping */}
    <g transform="translate(62, 55)">
      {/* Speaker body */}
      <path
        d="M5 12 L5 24 L12 24 L22 32 L22 4 L12 12 Z"
        fill="url(#speakerGradient)"
        stroke="#D97706"
        strokeWidth="1"
      />
      {/* Sound waves */}
      <path
        d="M26 11 C30 14 30 22 26 25"
        stroke="#F59E0B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 6 C37 12 37 24 30 30"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  </svg>
);

export default MusicNoteIcon;
