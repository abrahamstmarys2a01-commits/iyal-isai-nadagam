import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'medium', light = false, showText = true }) {
  const iconSize = size === 'small' ? 38 : size === 'large' ? 62 : 48;

  return (
    <Link to="/" className="logo-container" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
      <div className="logo-emblem-wrap" style={{ position: 'relative', flexShrink: 0, width: `${iconSize}px`, height: `${iconSize}px` }}>
        <svg viewBox="0 0 100 100" width={iconSize} height={iconSize} style={{ filter: 'drop-shadow(0 2px 8px rgba(201, 154, 53, 0.35))' }}>
          <defs>
            <radialGradient id="emblemBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#8E1B38" />
              <stop offset="60%" stop-color="#5C0D20" />
              <stop offset="100%" stop-color="#30050E" />
            </radialGradient>
            <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF3B3" />
              <stop offset="35%" stop-color="#E5BE58" />
              <stop offset="70%" stop-color="#C99A35" />
              <stop offset="100%" stop-color="#875E12" />
            </linearGradient>
            <linearGradient id="ringGold" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#C99A35" />
              <stop offset="50%" stop-color="#FFEBB0" />
              <stop offset="100%" stop-color="#C99A35" />
            </linearGradient>
          </defs>

          {/* Outer Ornamental Ring */}
          <circle cx="50" cy="50" r="48" fill="url(#emblemBg)" stroke="url(#ringGold)" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="url(#goldMetallic)" strokeWidth="1" strokeDasharray="3 2" />

          {/* Radiating 12 rays / lotus petals */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={i}
              cx={50 + 44 * Math.cos((i * 30 * Math.PI) / 180)}
              cy={50 + 44 * Math.sin((i * 30 * Math.PI) / 180)}
              r="1.8"
              fill="url(#goldMetallic)"
            />
          ))}

          {/* Inner Mandala Ring */}
          <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(201, 154, 53, 0.4)" strokeWidth="1" />

          {/* Classical Nataraja / Bharatanatyam Mudra Silhouette */}
          <g transform="translate(50, 50) scale(0.65) translate(-50, -50)">
            {/* Prabhavali (Fire ring arch) */}
            <path
              d="M 22,50 A 28,28 0 1,1 78,50"
              fill="none"
              stroke="url(#goldMetallic)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Flames on arch */}
            {[25, 35, 45, 55, 65, 75].map((angle, idx) => (
              <circle
                key={idx}
                cx={50 + 31 * Math.cos((angle * Math.PI) / 50)}
                cy={50 - 31 * Math.sin((angle * Math.PI) / 50)}
                r="1.5"
                fill="#FFE28A"
              />
            ))}

            {/* Dancer silhouette & Mudra */}
            {/* Head & Kireetam */}
            <circle cx="50" cy="28" r="4.5" fill="url(#goldMetallic)" />
            <polygon points="50,22 47,26 53,26" fill="#FFF2B5" />
            {/* Torso */}
            <path d="M 47,33 Q 50,42 46,50 L 54,50 Q 50,42 53,33 Z" fill="url(#goldMetallic)" />
            {/* Arms: Left abhaya mudra, Right danda hasta */}
            <path d="M 47,35 C 38,36 34,44 40,48" fill="none" stroke="url(#goldMetallic)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 53,35 C 64,34 68,43 56,46" fill="none" stroke="url(#goldMetallic)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Raised left leg (Ananda Tandava) */}
            <path d="M 48,50 C 44,56 36,54 34,48" fill="none" stroke="url(#goldMetallic)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Standing right leg */}
            <path d="M 52,50 L 52,65" stroke="url(#goldMetallic)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Lotus pedestal */}
            <ellipse cx="50" cy="67" rx="14" ry="4" fill="url(#goldMetallic)" />
            <path d="M 40,68 Q 50,73 60,68" stroke="#FFE28A" strokeWidth="1.5" fill="none" />
          </g>

          {/* Diya Glow / Star below */}
          <polygon points="50,81 52,85 57,85 53,88 55,92 50,89 45,92 47,88 43,85 48,85" fill="url(#goldMetallic)" />
        </svg>
      </div>

      {showText && (
        <div className="logo-text-block">
          <div
            className="logo-tamil-text"
            style={{
              fontFamily: "'Noto Serif Tamil', serif",
              fontSize: size === 'small' ? '0.78rem' : size === 'large' ? '1.05rem' : '0.92rem',
              fontWeight: 700,
              color: '#C99A35',
              letterSpacing: '0.02em',
              lineHeight: 1.2
            }}
          >
            இயல் இசை நாடகக் கலைமன்றம்
          </div>
          <div
            className="logo-english-title"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: size === 'small' ? '0.85rem' : size === 'large' ? '1.25rem' : '1.05rem',
              fontWeight: 800,
              color: light ? '#FAF7F0' : '#FFFFFF',
              letterSpacing: '0.04em',
              lineHeight: 1.25,
              textTransform: 'uppercase'
            }}
          >
            Iyal Isai Naadagam
          </div>
          <div
            className="logo-subtitle"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: size === 'small' ? '0.62rem' : '0.72rem',
              fontWeight: 500,
              color: 'rgba(201, 154, 53, 0.85)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}
          >
            Center for Tamil Cultural Arts
          </div>
        </div>
      )}
    </Link>
  );
}
