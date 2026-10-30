import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SectionTitle({
  badge,
  tamilBadge,
  title,
  tamilTitle,
  desc,
  tamilDesc,
  dark = false,
  align = 'center',
  className = ''
}) {
  const { isTamil } = useLanguage();

  // Pick language-specific content
  const displayBadge = isTamil ? (tamilBadge || badge) : badge;
  const displayTitle = isTamil ? (tamilTitle || title) : title;
  const displayDesc = isTamil ? (tamilDesc || desc) : desc;

  return (
    <div className={`section-header ${align === 'left' ? 'text-left' : ''} ${dark ? 'dark' : ''} ${className}`}>
      {displayBadge && (
        <div className="sub-badge">
          <Sparkles size={14} style={{ color: dark ? '#E5BE58' : '#C99A35' }} />
          <span>{displayBadge}</span>
        </div>
      )}

      <h2
        className="main-title"
        style={isTamil ? { fontFamily: 'var(--font-tamil)', letterSpacing: '0.01em', lineHeight: 1.3 } : {}}
      >
        {displayTitle}
      </h2>

      <div className="cultural-divider" style={{ justifyContent: align === 'left' ? 'flex-start' : 'center' }}>
        <div className="divider-line" />
        <div className="divider-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
          </svg>
        </div>
        <div className="divider-line" />
      </div>

      {displayDesc && <p className="desc">{displayDesc}</p>}
    </div>
  );
}
