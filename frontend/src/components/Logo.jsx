import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png';

export default function Logo({ size = 'medium', light = false, showText = true }) {
  const iconSize = size === 'small' ? 36 : size === 'large' ? 54 : 42;
  const { isTamil } = useLanguage();

  return (
    <Link
      to="/"
      className={`logo-container logo-size-${size}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'small' ? '8px' : '10px',
        textDecoration: 'none',
        minWidth: 0
      }}
    >
      <div
        className="logo-emblem-wrap"
        style={{
          position: 'relative',
          flexShrink: 0,
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          background: '#FAF7F0',
          border: '1.5px solid #C99A35',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px'
        }}
      >
        <img
          src={logoImg}
          alt="Iyal Isai Nadagam Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      {showText && (
        <div
          className="logo-text-block"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: 0
          }}
        >
          {isTamil ? (
            /* Tamil Title & Subtitle */
            <>
              <div
                className="logo-tamil-text"
                style={{
                  fontFamily: "'Noto Serif Tamil', serif",
                  fontWeight: 800,
                  color: '#FFE082',
                  letterSpacing: '0.01em',
                  lineHeight: 1.15,
                  textShadow: '0 1px 3px rgba(0,0,0,0.4)'
                }}
              >
                <span className="logo-tamil-row1" style={{ display: 'block', whiteSpace: 'nowrap' }}>இயல் இசை நாடகக்</span>
                <span className="logo-tamil-row2" style={{ display: 'block', whiteSpace: 'nowrap' }}>கலைமன்றம்</span>
              </div>
              <div
                className="logo-subtitle"
                style={{
                  fontFamily: "'Noto Serif Tamil', serif",
                  fontSize: size === 'small' ? '0.58rem' : '0.64rem',
                  fontWeight: 600,
                  color: 'rgba(201, 154, 53, 0.9)',
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                  marginTop: '1px'
                }}
              >
                தமிழ் பண்பாட்டுக் கலைக்கூடம்
              </div>
            </>
          ) : (
            /* English Title & Subtitle */
            <>
              <div
                className="logo-english-title"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 800,
                  color: light ? '#FAF7F0' : '#FFFFFF',
                  letterSpacing: '0.03em',
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                  textShadow: '0 1px 3px rgba(0,0,0,0.4)'
                }}
              >
                Iyal Isai Naadagam
              </div>
              <div
                className="logo-subtitle"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: size === 'small' ? '0.56rem' : '0.64rem',
                  fontWeight: 600,
                  color: 'rgba(201, 154, 53, 0.9)',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                  marginTop: '1px'
                }}
              >
                Center for Tamil Cultural Arts
              </div>
            </>
          )}
        </div>
      )}
    </Link>
  );
}
