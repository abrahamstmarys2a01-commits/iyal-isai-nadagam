import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!currentImage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 2, 5, 0.94)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: 'rgba(201, 154, 53, 0.2)',
          border: '1px solid rgba(201, 154, 53, 0.5)',
          color: '#FFE082',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s'
        }}
        title="Close (Esc)"
      >
        <X size={22} />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        style={{
          position: 'absolute',
          left: '24px',
          background: 'rgba(201, 154, 53, 0.2)',
          border: '1px solid rgba(201, 154, 53, 0.5)',
          color: '#FFE082',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s'
        }}
        title="Previous (Left Arrow)"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        style={{
          position: 'absolute',
          right: '24px',
          background: 'rgba(201, 154, 53, 0.2)',
          border: '1px solid rgba(201, 154, 53, 0.5)',
          color: '#FFE082',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s'
        }}
        title="Next (Right Arrow)"
      >
        <ChevronRight size={28} />
      </button>

      {/* Main Lightbox Content Box */}
      <div
        style={{
          maxWidth: '960px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#24040B',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid rgba(201, 154, 53, 0.4)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large Image */}
        <div style={{ position: 'relative', width: '100%', maxHeight: '65vh', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={currentImage.image}
            alt={currentImage.title}
            style={{
              maxWidth: '100%',
              maxHeight: '65vh',
              objectFit: 'contain'
            }}
          />
          {/* Image index counter badge */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            color: '#FFE082',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            border: '1px solid rgba(201, 154, 53, 0.4)'
          }}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Captions & Info */}
        <div style={{
          width: '100%',
          padding: '20px 24px',
          background: 'linear-gradient(180deg, #2D050E 0%, #1A0207 100%)',
          color: '#FAF7F0',
          borderTop: '1px solid rgba(201, 154, 53, 0.25)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-tamil)', color: 'var(--gold-light)', fontSize: '0.9rem', fontWeight: 700, display: 'block' }}>
                {currentImage.tamilTitle}
              </span>
              <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF', margin: 0 }}>
                {currentImage.title}
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(201, 154, 53, 0.15)',
                color: 'var(--gold-light)',
                border: '1px solid rgba(201, 154, 53, 0.3)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem'
              }}>
                <Tag size={12} /> {currentImage.category}
              </span>
              {currentImage.location && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: 'rgba(250, 247, 240, 0.7)',
                  fontSize: '0.82rem'
                }}>
                  <MapPin size={13} style={{ color: 'var(--gold-primary)' }} />
                  {currentImage.location}
                </span>
              )}
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(250, 247, 240, 0.8)' }}>
            {currentImage.description}
          </p>
        </div>
      </div>
    </div>
  );
}
