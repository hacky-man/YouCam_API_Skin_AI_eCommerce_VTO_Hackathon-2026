interface TrailIllustrationProps {
  className?: string;
}

export function TrailIllustration({ className = '' }: TrailIllustrationProps) {
  return (
    <svg
      viewBox="0 0 600 720"
      role="img"
      aria-label="Flat illustration of a runner on a hillside trail at sunrise with a scan frame around the head"
      className={className}
    >
      <rect width="600" height="720" fill="#fef3c7" />
      <rect y="0" width="600" height="300" fill="#fde68a" opacity="0.5" />

      <circle cx="300" cy="400" r="104" fill="#fbbf24" />
      <circle cx="300" cy="400" r="150" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 10" opacity="0.7" />

      <path d="M0 470 C120 420 210 440 300 430 C400 420 480 452 600 415 L600 720 L0 720 Z" fill="#cbd5e1" />
      <path d="M0 520 C100 480 220 500 320 500 S520 470 600 500 L600 720 L0 720 Z" fill="#6ee7b7" opacity="0.55" />

      <g fill="#065f46">
        <polygon points="56,470 74,520 38,520" />
        <polygon points="84,482 102,528 66,528" />
        <polygon points="520,462 540,516 500,516" />
        <polygon points="548,478 564,520 532,520" />
      </g>

      <path d="M0 580 C150 560 300 585 600 565 L600 720 L0 720 Z" fill="#064e3b" />
      <ellipse cx="270" cy="598" rx="140" ry="9" fill="#022c22" opacity="0.35" />

      <g stroke="#1c1917" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M284 395 L236 470 L190 560" strokeWidth="24" />
        <path d="M284 395 L330 480 L316 585" strokeWidth="24" />
        <path d="M300 300 L286 392" strokeWidth="50" />
        <path d="M298 312 L338 360 L372 330" strokeWidth="16" />
        <path d="M296 318 L256 345 L232 300" strokeWidth="16" />
      </g>

      <circle cx="302" cy="250" r="32" fill="#f5d0b0" />
      <path d="M270 246 A32 32 0 0 1 334 246 Z" fill="#047857" />
      <rect x="262" y="244" width="80" height="7" rx="3" fill="#065f46" />

      <g stroke="#047857" strokeWidth="3" fill="none" strokeLinecap="square">
        <path d="M246 218 V194 H270" />
        <path d="M334 194 H358 V218" />
        <path d="M358 282 V306 H334" />
        <path d="M270 306 H246 V282" />
      </g>

      <g transform="translate(372 196)">
        <rect width="176" height="60" rx="14" fill="#ffffff" />
        <text x="18" y="24" fontSize="12" fill="#57534e" fontFamily="Inter, sans-serif">Moisture</text>
        <text x="18" y="46" fontSize="20" fontWeight="600" fill="#9f1239" fontFamily="Inter, sans-serif">27 / 100</text>
      </g>
    </svg>
  );
}
