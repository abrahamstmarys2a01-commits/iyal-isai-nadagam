import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { isEventUpcoming } from '../data/events';
import { useLanguage } from '../context/LanguageContext';

export default function EventCard({ event }) {
  const upcoming = isEventUpcoming(event.date);
  const { isTamil } = useLanguage();

  const primaryTitle = isTamil ? (event.tamilTitle || event.title) : event.title;
  const secondaryTitle = isTamil ? (event.tamilTitle ? event.title : '') : (event.tamilTitle || '');

  return (
    <div className="ornate-card event-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      background: '#FFFFFF',
      border: '1px solid rgba(201, 154, 53, 0.25)',
      boxShadow: '0 8px 24px rgba(116, 21, 46, 0.08)'
    }}>
      {/* Poster Image Container */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={event.poster}
          alt={primaryTitle}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="event-card-img"
          onError={(e) => {
            e.currentTarget.src = '/assets/images/bharatanatyam_vintage.jpg';
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(38,4,12,0.85) 0%, rgba(38,4,12,0.1) 60%, transparent 100%)'
        }} />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span className="badge-category" style={{
            background: 'rgba(38, 4, 12, 0.75)',
            color: '#FFE082',
            borderColor: 'rgba(201, 154, 53, 0.5)',
            backdropFilter: 'blur(4px)'
          }}>
            {event.category}
          </span>

          {upcoming ? (
            <span className="badge-upcoming">
              <Sparkles size={12} /> {isTamil ? 'வரவிருக்கும் நிகழ்வு' : 'Upcoming'}
            </span>
          ) : (
            <span className="badge-completed">
              <CheckCircle2 size={12} /> {isTamil ? 'நிறைவுற்றது' : 'Completed'}
            </span>
          )}
        </div>

        {/* Date Overlay in Image Bottom */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#FAF7F0',
          fontSize: '0.85rem',
          fontWeight: 600
        }}>
          <Calendar size={14} style={{ color: 'var(--gold-light)' }} />
          <span>{event.displayDate}</span>
        </div>
      </div>

      {/* Content Body */}
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Main Title based on language */}
          <h3 style={{
            fontSize: '1.2rem',
            lineHeight: 1.35,
            marginBottom: '6px',
            color: 'var(--maroon-darkest)',
            fontWeight: 700,
            fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit'
          }}>
            <Link to={`/events/${event.id || event._id}`} style={{ transition: 'color 0.2s' }}>
              {primaryTitle}
            </Link>
          </h3>

          {/* Secondary Title */}
          {secondaryTitle && (
            <div style={{
              fontFamily: isTamil ? 'inherit' : 'var(--font-tamil)',
              fontSize: '0.86rem',
              color: isTamil ? 'var(--text-muted)' : 'var(--maroon-primary)',
              fontWeight: 600,
              marginBottom: '12px'
            }}>
              {secondaryTitle}
            </div>
          )}

          {/* Info Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={14} style={{ color: 'var(--gold-dark)', flexShrink: 0 }} />
              <span>{event.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <MapPin size={14} style={{ color: 'var(--gold-dark)', flexShrink: 0, marginTop: '3px' }} />
              <span style={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {event.venue}
              </span>
            </div>
          </div>

          {/* Short description */}
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            {event.shortDesc}
          </p>
        </div>

        {/* Buttons Action Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(201, 154, 53, 0.15)'
        }}>
          <Link
            to={`/events/${event.id || event._id}`}
            className="btn-maroon-outline"
            style={{
              padding: '9px 12px',
              fontSize: '0.82rem',
              fontWeight: 700,
              textAlign: 'center'
            }}
          >
            <span>{isTamil ? 'முழு விபரம்' : 'View Details'}</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            to={`/enquiry?event=${encodeURIComponent(event.title)}`}
            className="btn-gold"
            style={{
              padding: '9px 12px',
              fontSize: '0.82rem',
              textAlign: 'center'
            }}
          >
            <span>{isTamil ? 'முன்பதிவு' : 'Enquire Now'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
