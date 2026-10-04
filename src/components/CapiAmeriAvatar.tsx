'use client';

import React from 'react';

interface CapiAmeriAvatarProps {
  type: 'van' | 'plane';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CapiAmeriAvatar: React.FC<CapiAmeriAvatarProps> = ({ 
  type = 'van', 
  className = '',
  size = 'md'
}) => {
  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20'
  }[size];

  if (type === 'plane') {
    return (
      <div className={`relative ${dimensions} flex items-center justify-center ${className}`}>
        {/* Jet Thruster Glow / Particle trail */}
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gold-400/40 rounded-full blur-md animate-pulse" />
        
        {/* Animated Private Jet SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_8px_16px_rgba(245,183,49,0.35)] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Jet Stream Trail */}
          <path
            d="M15 65 L2 72"
            stroke="url(#jetGlow)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-pulse"
          />
          <path
            d="M20 70 L8 80"
            stroke="url(#jetGlow)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Main Fuselage */}
          <path
            d="M85 35 C88 38 88 42 85 45 L50 62 C40 67 28 65 24 61 L18 57 C16 55 17 52 19 50 L42 41 Z"
            fill="url(#fuselageGrad)"
            stroke="#e5a93b"
            strokeWidth="1.5"
          />

          {/* Wings */}
          <path
            d="M58 45 L72 78 C74 81 72 83 68 82 L48 64 Z"
            fill="url(#wingGrad)"
            stroke="#e5a93b"
            strokeWidth="1"
          />
          <path
            d="M45 42 L38 20 C37 18 39 17 42 19 L54 41 Z"
            fill="url(#wingGrad2)"
            stroke="#d49020"
            strokeWidth="1"
          />

          {/* Tail Fin */}
          <path
            d="M26 61 L14 38 C13 36 15 35 17 36 L30 58 Z"
            fill="url(#wingGrad)"
            stroke="#e5a93b"
            strokeWidth="1"
          />

          {/* Cockpit Window */}
          <path
            d="M74 38 C78 40 78 43 75 44 L67 47 L65 42 Z"
            fill="#38bdf8"
            opacity="0.9"
          />

          {/* Navigation Strobes */}
          <circle cx="72" cy="80" r="2.5" fill="#ef4444" className="animate-ping" />
          <circle cx="39" cy="19" r="2.5" fill="#10b981" className="animate-ping" />
          <circle cx="86" cy="40" r="2" fill="#fbbf24" className="animate-pulse" />

          {/* Luxury Gold Accents */}
          <line x1="38" y1="54" x2="68" y2="44" stroke="#fbbf24" strokeWidth="1.5" />

          <defs>
            <linearGradient id="fuselageGrad" x1="18" y1="40" x2="88" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0f172a" />
              <stop offset="0.6" stopColor="#1e293b" />
              <stop offset="1" stopColor="#d49020" />
            </linearGradient>
            <linearGradient id="wingGrad" x1="48" y1="45" x2="72" y2="82" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e293b" />
              <stop offset="0.8" stopColor="#d49020" />
            </linearGradient>
            <linearGradient id="wingGrad2" x1="45" y1="42" x2="38" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0f172a" />
              <stop offset="1" stopColor="#e5a93b" />
            </linearGradient>
            <linearGradient id="jetGlow" x1="2" y1="72" x2="15" y2="65" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" stopOpacity="0" />
              <stop offset="1" stopColor="#f59e0b" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Luxury Suburban / Van VIP Avatar
  return (
    <div className={`relative ${dimensions} flex items-center justify-center ${className}`}>
      {/* Underglow neon reflection */}
      <div className="absolute -bottom-1 left-2 right-2 h-3 bg-gold-500/30 rounded-full blur-md animate-pulse" />

      {/* Animated Van SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(245,183,49,0.35)] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Speed lines */}
        <line x1="4" y1="52" x2="16" y2="52" stroke="#e5a93b" strokeWidth="2" strokeLinecap="round" opacity="0.6" className="animate-pulse" />
        <line x1="8" y1="62" x2="18" y2="62" stroke="#e5a93b" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

        {/* Van Main Body */}
        <path
          d="M20 62 L20 46 C20 44 21 42 23 42 L58 40 C61 40 64 42 66 45 L78 54 C80 55 82 58 84 60 L85 64 C85 66 84 67 82 67 L79 67 C79 61 74 57 68 57 C62 57 57 61 57 67 L39 67 C39 61 34 57 28 57 C22 57 17 61 17 67 L16 67 C14 67 13 65 13 63 L13 62 Z"
          fill="url(#vanBodyGrad)"
          stroke="#e5a93b"
          strokeWidth="1.5"
        />

        {/* Tinted VIP Windows */}
        <path
          d="M25 45 L40 45 L40 54 L24 54 Z"
          fill="#1e293b"
          stroke="#94a3b8"
          strokeWidth="0.8"
          opacity="0.9"
        />
        <path
          d="M43 45 L58 45 L58 54 L43 54 Z"
          fill="#1e293b"
          stroke="#94a3b8"
          strokeWidth="0.8"
          opacity="0.9"
        />
        <path
          d="M61 45 L73 53 L61 54 Z"
          fill="#38bdf8"
          opacity="0.85"
        />

        {/* Front LED Headlights (Glowing) */}
        <ellipse cx="83" cy="59" rx="2.5" ry="3.5" fill="#fef08a" className="animate-pulse" />
        <ellipse cx="83" cy="59" rx="1.5" ry="2" fill="#ffffff" />
        {/* Headlight beam */}
        <polygon points="85,57 98,52 98,66 85,62" fill="url(#headlightBeam)" opacity="0.6" />

        {/* Rear Red Lamp */}
        <rect x="13" y="55" width="2" height="6" rx="1" fill="#ef4444" className="animate-pulse" />

        {/* Golden VIP Side Stripe */}
        <line x1="20" y1="56" x2="79" y2="56" stroke="url(#goldStripe)" strokeWidth="1.5" />

        {/* Wheels with Golden Rims */}
        {/* Front Wheel */}
        <circle cx="68" cy="67" r="7" fill="#090d16" stroke="#475569" strokeWidth="1.5" />
        <circle cx="68" cy="67" r="4.5" fill="#1e293b" stroke="#e5a93b" strokeWidth="1.2" />
        <circle cx="68" cy="67" r="2" fill="#e5a93b" />

        {/* Rear Wheel */}
        <circle cx="28" cy="67" r="7" fill="#090d16" stroke="#475569" strokeWidth="1.5" />
        <circle cx="28" cy="67" r="4.5" fill="#1e293b" stroke="#e5a93b" strokeWidth="1.2" />
        <circle cx="28" cy="67" r="2" fill="#e5a93b" />

        {/* Roof Rails */}
        <line x1="26" y1="40" x2="56" y2="39" stroke="#d49020" strokeWidth="1.5" strokeLinecap="round" />

        <defs>
          <linearGradient id="vanBodyGrad" x1="13" y1="40" x2="85" y2="67" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0f172a" />
            <stop offset="0.65" stopColor="#1e293b" />
            <stop offset="1" stopColor="#2a3547" />
          </linearGradient>
          <linearGradient id="goldStripe" x1="20" y1="56" x2="79" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d49020" />
            <stop offset="0.5" stopColor="#fef08a" />
            <stop offset="1" stopColor="#e5a93b" />
          </linearGradient>
          <linearGradient id="headlightBeam" x1="85" y1="59" x2="98" y2="59" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="1" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
