import React from "react";

interface FishIconProps {
  className?: string;
  color?: string;
}

const FishIcon = ({ className = "", color = "currentColor" }: FishIconProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fish body - streamlined sardine shape */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="18"
        fill={color}
        opacity="0.9"
      />
      
      {/* Tail fin */}
      <path
        d="M15 50 L5 35 L5 65 Z"
        fill={color}
        opacity="0.8"
      />
      
      {/* Dorsal fin */}
      <path
        d="M45 32 Q50 22 60 32"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      
      {/* Pectoral fin */}
      <ellipse
        cx="55"
        cy="58"
        rx="8"
        ry="4"
        fill={color}
        opacity="0.6"
        transform="rotate(-20 55 58)"
      />
      
      {/* Eye */}
      <circle
        cx="72"
        cy="47"
        r="5"
        fill="white"
      />
      <circle
        cx="73"
        cy="46"
        r="2.5"
        fill="#1a1a2e"
      />
      
      {/* Gill line */}
      <path
        d="M65 42 Q62 50 65 58"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      
      {/* Scale pattern - subtle lines */}
      <path
        d="M30 45 Q35 50 30 55"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M40 43 Q45 50 40 57"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M50 42 Q55 50 50 58"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      
      {/* Shine/highlight */}
      <ellipse
        cx="55"
        cy="42"
        rx="12"
        ry="4"
        fill="white"
        opacity="0.2"
      />
      
      {/* Small bubbles */}
      <circle cx="88" cy="40" r="2" fill={color} opacity="0.4" />
      <circle cx="92" cy="48" r="1.5" fill={color} opacity="0.3" />
      <circle cx="90" cy="55" r="1" fill={color} opacity="0.25" />
    </svg>
  );
};

export default FishIcon;
