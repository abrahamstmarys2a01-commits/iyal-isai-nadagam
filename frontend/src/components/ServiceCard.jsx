import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Music, Flame, Bell, Theater, Crown, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Sparkles: Sparkles,
  Music: Music,
  Flame: Flame,
  Bell: Bell,
  Theater: Theater,
  Crown: Crown
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.iconName] || Sparkles;
  const { lang } = useLanguage();
  const isTa = lang === 'ta';

  const displayTitle = isTa ? (service.tamilTitle || service.title) : service.title;
  const secondaryTitle = isTa ? (service.tamilTitle ? service.title : '') : (service.tamilTitle || '');

  return (
    <div className="ornate-card service-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRadius: '16px',
      overflow: 'hidden',
      background: '#FFFFFF',
      border: '1px solid rgba(201, 154, 53, 0.25)',
      boxShadow: '0 8px 24px rgba(116, 21, 46, 0.06)'
    }}>
      {/* Top Banner Image with Icon Badge */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img
          src={service.image}
          alt={displayTitle}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.currentTarget.src = '/assets/images/bharatanatyam_vintage.jpg';
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(38,4,12,0.85) 0%, rgba(38,4,12,0.2) 60%, transparent 100%)'
        }} />

        {/* Floating Icon Emblem */}
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          right: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--gold-gradient)',
          color: '#26040C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          border: '2px solid #FFFFFF',
          zIndex: 2
        }}>
          <IconComponent size={22} />
        </div>

        {/* Troupe Size Tag */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          background: 'rgba(38, 4, 12, 0.75)',
          backdropFilter: 'blur(4px)',
          color: '#FFE082',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '0.74rem',
          fontWeight: 600,
          border: '1px solid rgba(201, 154, 53, 0.4)'
        }}>
          {service.troupeSize}
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '28px 20px 20px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {secondaryTitle && (
            <div style={{
              fontFamily: isTa ? 'inherit' : 'var(--font-tamil)',
              fontSize: '0.86rem',
              color: 'var(--maroon-primary)',
              fontWeight: 700,
              marginBottom: '6px'
            }}>
              {secondaryTitle}
            </div>
          )}

          <h3 style={{
            fontSize: '1.25rem',
            color: 'var(--maroon-darkest)',
            marginBottom: '10px',
            lineHeight: 1.3,
            fontFamily: isTa ? 'var(--font-tamil)' : 'var(--font-heading)'
          }}>
            {displayTitle}
          </h3>

          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '16px'
          }}>
            {service.shortDesc}
          </p>

          {/* Key highlights list */}
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '20px'
          }}>
            {service.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.84rem',
                color: 'var(--text-dark)'
              }}>
                <Check size={14} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action button */}
        <div style={{
          paddingTop: '16px',
          borderTop: '1px solid rgba(201, 154, 53, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link
            to={`/enquiry?service=${encodeURIComponent(service.title)}`}
            className="btn-gold"
            style={{ width: '100%', padding: '10px 18px', fontSize: '0.86rem', justifyContent: 'center' }}
          >
            <span>{isTa ? 'கலைக்குழுவை முன்பதிவு செய்க' : 'Book This Troupe'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
