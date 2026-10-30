import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronRight, MessageCircle, Heart, Calendar, Award } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { isTamil, t } = useLanguage();

  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.events'), path: '/events' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.enquiry'), path: '/enquiry' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <footer className="footer-wrapper" style={{
      background: 'linear-gradient(180deg, #2D050E 0%, #170206 100%)',
      color: '#FAF7F0',
      borderTop: '2px solid rgba(201, 154, 53, 0.35)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Mandala Accents */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        right: '-60px',
        width: '280px',
        height: '280px',
        opacity: 0.05,
        pointerEvents: 'none'
      }}>
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#C99A35" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#C99A35" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#C99A35" strokeWidth="1" />
        </svg>
      </div>

      <div className="container" style={{ paddingTop: '70px', paddingBottom: '40px' }}>
        <div className="footer-grid">
          {/* Column 1: Organization Bio */}
          <div style={{ minWidth: 0, paddingRight: '12px' }}>
            <Logo size="medium" light={true} />
            <p style={{
              marginTop: '18px',
              fontSize: '0.92rem',
              color: 'rgba(250, 247, 240, 0.75)',
              lineHeight: 1.7
            }}>
              {isTamil ?
                'இயல் இசை நாடகக் கலைமன்றம் என்பது செம்மொழித் தமிழின் தொன்மை மரபையும், பாரம்பரிய கிராமியக் கலைகளையும் பாதுகாத்து உலகெங்கும் பறைசாற்றும் பண்பாட்டு அறக்கட்டளையாகும்.'
                : 'Iyal Isai Naadaga Kalamanram is dedicated to preserving, promoting, and celebrating the rich classical and folk performing arts of Tamil heritage across generations.'
              }
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px'
            }}>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(201, 154, 53, 0.15)',
                  border: '1px solid rgba(201, 154, 53, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)',
                  transition: 'var(--transition)'
                }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(201, 154, 53, 0.15)',
                  border: '1px solid rgba(201, 154, 53, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)'
                }}
              >
                <Award size={18} />
              </div>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(201, 154, 53, 0.15)',
                  border: '1px solid rgba(201, 154, 53, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)'
                }}
              >
                <Calendar size={18} />
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{
              color: '#FFFFFF',
              fontSize: '1.15rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: 'var(--gold-primary)' }}>✦</span> {t('footer.quickLinks')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    style={{
                      color: 'rgba(250, 247, 240, 0.8)',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--gold-light)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(250, 247, 240, 0.8)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <ChevronRight size={14} style={{ color: 'var(--gold-primary)' }} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Classical & Folk Wings */}
          <div>
            <h4 style={{
              color: '#FFFFFF',
              fontSize: '1.15rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: 'var(--gold-primary)' }}>✦</span> {t('footer.artForms')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ color: 'rgba(250, 247, 240, 0.8)', fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--gold-light)' }}>{isTamil ? 'இயல் (இலக்கியம்):' : 'Iyal (Literature):'}</strong> {isTamil ? 'சங்க இலக்கிய கவியரங்கம், திருக்குறள் நயவுரைகள்.' : 'Sangam poetry recitations, literary oratory & discourse.'}
              </li>
              <li style={{ color: 'rgba(250, 247, 240, 0.8)', fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--gold-light)' }}>{isTamil ? 'இசை (சங்கீதம்):' : 'Isai (Music):'}</strong> {isTamil ? 'கர்நாடக குரலிசை, சரஸ்வதி வீணை, நாதஸ்வரம்-தவில்.' : 'Carnatic vocal, Veena, Violin, Nadaswaram & Thavil.'}
              </li>
              <li style={{ color: 'rgba(250, 247, 240, 0.8)', fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--gold-light)' }}>{isTamil ? 'நாடகம் (நாட்டியம்):' : 'Naadagam (Drama):'}</strong> {isTamil ? 'செவ்வியல் பரதநாட்டியம், வரலாற்று நாடகம் & தெருக்கூத்து.' : 'Classical Bharatanatyam, Therukoothu & Stage Theatre.'}
              </li>
              <li style={{ color: 'rgba(250, 247, 240, 0.8)', fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--gold-light)' }}>{isTamil ? 'கிராமியம் (நாட்டுப்புறம்):' : 'Folk Arts:'}</strong> {isTamil ? 'மங்கல கரகாட்டம், மயிலாட்டம், ஒயிலாட்டம், பறை இசை.' : 'Karakattam, Mayilattam, Oyilattam & Parai Isai.'}
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Cultural Mandram Office */}
          <div>
            <h4 style={{
              color: '#FFFFFF',
              fontSize: '1.15rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: 'var(--gold-primary)' }}>✦</span> {t('footer.contactUs')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--gold-light)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ color: 'rgba(250, 247, 240, 0.8)' }}>
                  {isTamil ? 'முத்தமிழ் வளாகம், கலை வீதி, சென்னை & மதுரை, தமிழ்நாடு, இந்தியா' : 'Muthamizh Valagam, Arts Corridor, Chennai & Madurai, Tamil Nadu, India'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--gold-light)', flexShrink: 0 }} />
                <span style={{ color: 'rgba(250, 247, 240, 0.8)' }}>+91 98765 43210 / +91 94440 12345</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--gold-light)', flexShrink: 0 }} />
                <span style={{ color: 'rgba(250, 247, 240, 0.8)' }}>contact@kalamanram.org</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <Link to="/enquiry" className="btn-gold-outline" style={{ width: '100%', padding: '10px 18px', fontSize: '0.86rem', display: 'block', textAlign: 'center' }}>
                  {isTamil ? 'கலைக்குழுவை முன்பதிவு செய்க' : 'Book Troupe for Event'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar" style={{
          borderTop: '1px solid rgba(201, 154, 53, 0.2)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.85rem',
          color: 'rgba(250, 247, 240, 0.6)'
        }}>
          <div>
            © {new Date().getFullYear()} Iyal Isai Naadaga Kalamanram (இயல் இசை நாடகக் கலைமன்றம்). {t('footer.rights')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{isTamil ? 'தமிழ் மரபைக் காப்போம்' : 'Preserving Tamil Heritage with'}</span>
            <Heart size={14} style={{ color: '#E53E3E', fill: '#E53E3E' }} />
            <span style={{ color: 'var(--gold-light)' }}>{isTamil ? 'அன்பும் பக்தியும் நிறைந்த கலைத்தொண்டு' : 'Tradition & Devotion'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
