import React from 'react';

interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({ size = 28, className = '' }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Esagono sfondo blu */}
      <path
        d="M16 2L28.124 9V23L16 30L3.876 23V9L16 2Z"
        fill="#0052CC"
      />
      {/* Fulmine bianco */}
      <path
        d="M18.5 5.5L11 17H16L13.5 26.5L21 15H16L18.5 5.5Z"
        fill="white"
      />
    </svg>
  );
}
