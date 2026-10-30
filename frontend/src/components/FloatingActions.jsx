import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const { isTamil } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* WhatsApp Chat Floating Trigger */}
      <div style={{ position: 'fixed', bottom: '28px', left: '28px', zIndex: 100 }}>
        {showChatPopup && (
          <div style={{
            position: 'absolute',
            bottom: '65px',
            left: '0',
            width: '290px',
            background: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.25)',
            border: '1px solid rgba(201, 154, 53, 0.4)',
            overflow: 'hidden',
            animation: 'fadeIn 0.25s ease'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #74152E 0%, #460718 100%)',
              color: '#FFFFFF',
              padding: '16px',
              position: 'relative'
            }}>
              <button
                onClick={() => setShowChatPopup(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFE082' }}>
                {isTamil ? 'இயல் இசை நாடகக் கலைமன்றம்' : 'Iyal Isai Naadagam'}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                {isTamil ? 'கலைக்குழு முன்பதிவு & ஆலோசனைகள்' : 'Cultural Troupe Booking & Queries'}
              </div>
            </div>
            <div style={{ padding: '16px', fontSize: '0.86rem', color: '#333' }}>
              <p style={{ margin: '0 0 14px' }}>
                {isTamil ?
                  'வணக்கம்! உங்கள் இல்ல சுப நிகழ்ச்சிகள் மற்றும் கோவில் திருவிழாக்களுக்கு கலைக்குழுக்கள் தேவையா? இப்போதே வாட்ஸ்அப்பில் உரையாடுங்கள்!'
                  : 'வணக்கம்! Need classical dancers, folk artists, or musicians for your wedding or festival? Chat with our cultural coordinator now!'
                }
              </p>
              <a
                href="https://wa.me/919876543210?text=Vanakkam!%20I%20would%20like%20to%20enquire%20about%20cultural%20performances%20by%20Iyal%20Isai%20Naadaga%20Kalamanram."
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={16} />
                <span>{isTamil ? 'வாட்ஸ்அப்பில் உரையாட' : 'Start WhatsApp Chat'}</span>
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowChatPopup(!showChatPopup)}
          className="whatsapp-floating"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={20} />
          <span>{isTamil ? 'வாட்ஸ்அப் அரட்டை' : 'Chat on WhatsApp'}</span>
        </button>
      </div>

      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="back-to-top-btn"
          aria-label="Scroll to top"
          title="Back to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}
