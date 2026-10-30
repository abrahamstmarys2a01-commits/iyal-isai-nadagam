import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Logo({ size = 'medium', light = false, showText = true }) {
  const iconSize = size === 'small' ? 40 : size === 'large' ? 64 : 48;

  return (
    <Link to="/" className="logo-container" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
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
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
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
            <div>இயல் இசை நாடகக்</div>
            <div>கலைமன்றம்</div>
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
