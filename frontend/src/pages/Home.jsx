import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  CheckCircle,
  Star,
  Users,
  Award,
  Globe2,
  HeartHandshake,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Music2,
  BookOpen
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import EventCard from '../components/EventCard';
import ServiceCard from '../components/ServiceCard';
import { api } from '../services/api';
import { eventsData } from '../data/events';
import { servicesData } from '../data/services';
import { galleryData } from '../data/gallery';
import { useLanguage } from '../context/LanguageContext';
import '../styles/home.css';

export default function Home() {
  const [events, setEvents] = useState(eventsData);
  const [gallery, setGallery] = useState(galleryData);
  const { lang, isTamil, t } = useLanguage();

  useEffect(() => {
    // Dynamically fetch latest events added by admin
    api.getPublicEvents().then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setEvents(res.data);
      }
    }).catch(() => {});

    // Dynamically fetch latest gallery photos uploaded by admin
    api.getPublicGallery().then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setGallery(res.data.map((item, idx) => ({
          id: item._id || item.id || idx,
          category: item.category,
          title: item.title,
          tamilTitle: item.tamilTitle,
          image: item.imageUrl,
          location: item.location
        })));
      }
    }).catch(() => {});
  }, []);

  // 3-4 upcoming/highlighted events
  const previewEvents = events.slice(0, 3);
  // 6 preview gallery images
  const previewGallery = gallery.slice(0, 6);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION - Culturally Stunning with Mandalas, Golden Accents & Dancer */}
      <section className="hero-section">
        {/* Decorative Top-Right Mandala */}
        <div className="hero-mandala-tr">
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#C99A35" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="#C99A35" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#C99A35" strokeWidth="2" strokeDasharray="8 4" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="#C99A35" strokeWidth="1" />
            <circle cx="100" cy="100" r="30" fill="none" stroke="#C99A35" strokeWidth="1.5" />
            {[...Array(16)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="10"
                x2="100"
                y2="190"
                stroke="#C99A35"
                strokeWidth="0.75"
                transform={`rotate(${i * 11.25} 100 100)`}
              />
            ))}
          </svg>
        </div>

        {/* Decorative Bottom-Left Mandala */}
        <div className="hero-mandala-bl">
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <circle cx="100" cy="100" r="85" fill="none" stroke="#C99A35" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#C99A35" strokeWidth="1" strokeDasharray="4 2" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#C99A35" strokeWidth="2" />
            {[...Array(12)].map((_, i) => (
              <circle
                key={i}
                cx={100 + 70 * Math.cos((i * 30 * Math.PI) / 180)}
                cy={100 + 70 * Math.sin((i * 30 * Math.PI) / 180)}
                r="3"
                fill="#C99A35"
              />
            ))}
          </svg>
        </div>

        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={14} />
                <span>{t('hero.badge')}</span>
              </div>

              <div className="hero-tamil-heading">
                {t('hero.orgTitle')}
              </div>

              <h1 className="hero-title">
                {isTamil ? (
                  <>
                    செம்மொழித் தமிழ் <br />
                    <span>கலைகளைக் கொண்டாடுவோம்</span>
                  </>
                ) : (
                  <>Celebrating <span>Tamil Arts & Culture</span></>
                )}
              </h1>

              <div className="hero-subtitle">
                {t('hero.subtitle')}
              </div>

              <p className="hero-desc">
                {t('hero.desc')}
              </p>

              <div className="hero-btn-group">
                <Link to="/events" className="btn-gold" id="btn-hero-explore">
                  <Calendar size={18} />
                  <span>{t('common.exploreEvents')}</span>
                </Link>

                <Link to="/enquiry" className="btn-gold-outline" id="btn-hero-enquire">
                  <Sparkles size={18} />
                  <span>{t('common.enquireNow')}</span>
                </Link>

                <a
                  href="https://wa.me/919876543210?text=Vanakkam!%20I%20would%20like%20to%20enquire%20about%20cultural%20performances%20by%20Iyal%20Isai%20Naadaga%20Kalamanram."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-outline"
                  style={{
                    borderColor: 'rgba(37, 211, 102, 0.6)',
                    color: '#25D366'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>{t('common.chatWhatsApp')}</span>
                </a>
              </div>
            </div>

            {/* Right Dancer Visual - Styled exactly like the user's reference mockup */}
            <div className="hero-visual">
              <div className="hero-dancer-glow" />

              <div className="hero-dancer-frame">
                <img
                  src="/assets/images/bharatanatyam_vintage.jpg"
                  alt="Bharatanatyam Classical Dance Performance"
                  className="hero-dancer-img"
                />

                {/* Floating cultural badge */}
                <div className="hero-dancer-badge">
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--gold-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#20030A'
                  }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.9rem' }}>
                      {isTamil ? 'பாரம்பரிய நாட்டிய மார்க்கம்' : 'Authentic Margam'}
                    </div>
                    <div style={{ color: 'rgba(250, 247, 240, 0.75)', fontSize: '0.74rem' }}>
                      {isTamil ? 'கலைமன்ற ஆசான்கள் & குழுவினர்' : 'Master Ganesan & Troupes'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS RIBBON */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{t('stats.stat2Number')}</span>
              <span className="stat-label">{t('stats.stat2Label')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{t('stats.stat1Number')}</span>
              <span className="stat-label">{t('stats.stat1Label')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{t('stats.stat3Number')}</span>
              <span className="stat-label">{t('stats.stat3Label')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{t('stats.stat4Number')}</span>
              <span className="stat-label">{t('stats.stat4Label')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="section" style={{ background: 'var(--cream-bg)' }}>
        <div className="container">
          <div className="about-home-grid">
            {/* Left Image Collage with Stamp */}
            <div className="about-img-frame">
              <img
                src="/assets/images/iyal_isai_nadagam_hero.jpg"
                alt="Iyal Isai Naadagam Artists - தஞ்சைப் பெருங்கோவில் முத்தமிழ்ச் சங்கமம்"
              />
              <div className="about-experience-stamp">
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)', lineHeight: 1 }}>
                  {t('about.stampNumber')}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {t('about.stampLabel')}
                </div>
              </div>
            </div>

            {/* Right Story & Mission */}
            <div>
              <SectionTitle
                align="left"
                badge={t('about.badge')}
                tamilTitle={t('about.tamilHeading')}
                title={t('about.title')}
              />

              <p style={{ fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '16px' }}>
                {t('about.desc1')}
              </p>

              <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                {t('about.desc2')}
              </p>

              <div className="about-highlights-list">
                <div className="about-highlight-card">
                  <Award size={20} style={{ color: 'var(--maroon-primary)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--maroon-darkest)', display: 'block' }}>
                      {t('about.highlight1Title')}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {t('about.highlight1Desc')}
                    </span>
                  </div>
                </div>

                <div className="about-highlight-card">
                  <ShieldCheck size={20} style={{ color: 'var(--maroon-primary)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--maroon-darkest)', display: 'block' }}>
                      {t('about.highlight2Title')}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {t('about.highlight2Desc')}
                    </span>
                  </div>
                </div>

                <div className="about-highlight-card">
                  <Music2 size={20} style={{ color: 'var(--maroon-primary)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--maroon-darkest)', display: 'block' }}>
                      {t('about.highlight3Title')}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {t('about.highlight3Desc')}
                    </span>
                  </div>
                </div>

                <div className="about-highlight-card">
                  <BookOpen size={20} style={{ color: 'var(--maroon-primary)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--maroon-darkest)', display: 'block' }}>
                      {t('about.highlight4Title')}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {t('about.highlight4Desc')}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <Link to="/about" className="btn-maroon">
                  <span>{t('common.readFullStory')}</span>
                  <ArrowRight size={16} />
                </Link>

                <Link to="/services" className="btn-maroon-outline">
                  <span>{t('common.exploreArtForms')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. MUTHAMIZH TRIAD SHOWCASE: IYAL, ISAI, NAADAGAM */}
      <section className="section" style={{
        background: 'linear-gradient(180deg, #2A050E 0%, #170207 100%)',
        borderTop: '2px solid rgba(201, 154, 53, 0.4)',
        borderBottom: '2px solid rgba(201, 154, 53, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionTitle
            dark={true}
            badge={t('muthamizh.badge')}
            tamilTitle={t('muthamizh.heading')}
            title={t('muthamizh.subheading')}
            desc={t('muthamizh.desc')}
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
            marginTop: '36px'
          }}>
            {/* Card 1: Iyal */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(201, 154, 53, 0.35)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/assets/images/iyal_vintage.jpg"
                  alt="இயல் - சங்கப் புலவர் & ஓலைச்சுவடி இலக்கியம்"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(116, 21, 46, 0.92)',
                  color: 'var(--gold-light)',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  border: '1px solid rgba(201, 154, 53, 0.5)'
                }}>
                  {t('muthamizh.iyalBadge')}
                </div>
              </div>
              <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  fontFamily: 'var(--font-tamil)',
                  color: 'var(--gold-light)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '6px'
                }}>
                  {t('muthamizh.iyalTitle')}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '12px' }}>
                  {t('muthamizh.iyalSub')}
                </h3>
                <p style={{ color: 'rgba(250, 247, 240, 0.8)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                  {t('muthamizh.iyalDesc')}
                </p>
              </div>
            </div>

            {/* Card 2: Isai */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(201, 154, 53, 0.35)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/assets/images/isai_vintage.jpg"
                  alt="இசை - சரஸ்வதி வீணை & கோவில் சங்கீத கச்சேரி"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(116, 21, 46, 0.92)',
                  color: 'var(--gold-light)',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  border: '1px solid rgba(201, 154, 53, 0.5)'
                }}>
                  {t('muthamizh.isaiBadge')}
                </div>
              </div>
              <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  fontFamily: 'var(--font-tamil)',
                  color: 'var(--gold-light)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '6px'
                }}>
                  {t('muthamizh.isaiTitle')}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '12px' }}>
                  {t('muthamizh.isaiSub')}
                </h3>
                <p style={{ color: 'rgba(250, 247, 240, 0.8)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                  {t('muthamizh.isaiDesc')}
                </p>
              </div>
            </div>

            {/* Card 3: Naadagam */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(201, 154, 53, 0.35)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/assets/images/nadagam_vintage.jpg"
                  alt="நாடகம் - வரலாற்று மேடை நாடகம் & வேந்தர் வேடம்"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(116, 21, 46, 0.92)',
                  color: 'var(--gold-light)',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  border: '1px solid rgba(201, 154, 53, 0.5)'
                }}>
                  {t('muthamizh.naadagamBadge')}
                </div>
              </div>
              <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  fontFamily: 'var(--font-tamil)',
                  color: 'var(--gold-light)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '6px'
                }}>
                  {t('muthamizh.naadagamTitle')}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '12px' }}>
                  {t('muthamizh.naadagamSub')}
                </h3>
                <p style={{ color: 'rgba(250, 247, 240, 0.8)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                  {t('muthamizh.naadagamDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR SERVICES / ART FORMS */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge={t('services.badge')}
            tamilTitle={t('services.heading')}
            title={t('services.title')}
            desc={t('services.desc')}
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px'
          }}>
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/services" className="btn-gold">
              <span>{t('common.viewPackages')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. UPCOMING EVENTS PREVIEW */}
      <section className="section" style={{ background: 'var(--cream-bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', gap: '20px' }}>
            <SectionTitle
              align="left"
              badge={t('events.badge')}
              tamilTitle={t('events.heading')}
              title={t('events.title')}
              desc={t('events.desc')}
              className="mb-0"
            />

            <Link to="/events" className="btn-maroon-outline" style={{ alignSelf: 'center' }}>
              <span>{t('common.viewAllEvents')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="events-grid">
            {previewEvents.map((event) => (
              <EventCard key={event.id || event._id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="section" style={{
        background: 'linear-gradient(180deg, #380715 0%, #1F030A 100%)',
        color: '#FAF7F0',
        borderTop: '2px solid rgba(201, 154, 53, 0.3)',
        borderBottom: '2px solid rgba(201, 154, 53, 0.3)'
      }}>
        <div className="container">
          <SectionTitle
            dark={true}
            badge={isTamil ? "கலைமன்றத்தின் தனித்துவம்" : "The Kalamanram Distinction"}
            tamilTitle={isTamil ? "ஏன் எங்கள் கலைமன்றத்தைத் தேர்ந்தெடுக்க வேண்டும்?" : "Why Choose Our Academy"}
            title={isTamil ? "பாரம்பரிய ஒழுக்கம் & மேடைத் திறன்" : "Why Choose Iyal Isai Naadaga Kalamanram"}
            desc={isTamil ? "மரபுசார் தூய்மை, சீரிய பயிற்சி மற்றும் மனதை மயக்கும் மேடை அரங்கேற்றங்கள்." : "Dedicated to authenticity, discipline, and breathtaking theatrical execution."}
          />

          <div className="features-grid">
            <div className="feature-box" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(201, 154, 53, 0.3)', color: '#FAF7F0' }}>
              <div className="feature-icon-circle" style={{ background: 'rgba(201, 154, 53, 0.15)', color: 'var(--gold-light)' }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '12px' }}>
                {isTamil ? 'செவ்வியல் மரபு மாறா கலைகள்' : 'Traditional Cultural Experience'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250, 247, 240, 0.75)', lineHeight: 1.6 }}>
                {isTamil ? 'ஒவ்வொரு நிகழ்ச்சியும் சாஸ்திர விதிகளுக்கும், பாரம்பரிய கிராமிய வேர்களுக்கும் எவ்வித குறையுமின்றி நேர்த்தியாக வழங்கப்படுகிறது.' : 'Every performance strictly adheres to classical grammar and ancestral folk roots without compromising sacred aesthetic integrity.'}
              </p>
            </div>

            <div className="feature-box" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(201, 154, 53, 0.3)', color: '#FAF7F0' }}>
              <div className="feature-icon-circle" style={{ background: 'rgba(201, 154, 53, 0.15)', color: 'var(--gold-light)' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '12px' }}>
                {isTamil ? 'மூத்த கலை வித்வான்கள்' : 'Professional Performers'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250, 247, 240, 0.75)', lineHeight: 1.6 }}>
                {isTamil ? 'பல தசாப்தங்களாக மேடைத் தொண்டாற்றிய அனுபவமிக்க வித்வான்கள், நட்டுவனார்கள் மற்றும் பாரம்பரிய கிராமியக் கலைஞர்கள்.' : 'Seasoned vidwans, award-winning nattuvanars, and acrobatic folk exponents trained across decades of rigorous stage disciplines.'}
              </p>
            </div>

            <div className="feature-box" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(201, 154, 53, 0.3)', color: '#FAF7F0' }}>
              <div className="feature-icon-circle" style={{ background: 'rgba(201, 154, 53, 0.15)', color: 'var(--gold-light)' }}>
                <Star size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '12px' }}>
                {isTamil ? 'உயர்தர மேடை தயாரிப்பு' : 'Quality Stage Production'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250, 247, 240, 0.75)', lineHeight: 1.6 }}>
                {isTamil ? 'தெளிவான ஒலி ஒழுங்கு, பாரம்பரிய கோவில் நகைகள், தூய பட்டு ஆடைகள் மற்றும் துல்லியமான மேடை ஒளியமைப்பு.' : 'Impeccable acoustic balancing, authentic temple jewelry, handcrafted silk attire, and synchronized theatrical cues.'}
              </p>
            </div>

            <div className="feature-box" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(201, 154, 53, 0.3)', color: '#FAF7F0' }}>
              <div className="feature-icon-circle" style={{ background: 'rgba(201, 154, 53, 0.15)', color: 'var(--gold-light)' }}>
                <Globe2 size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '12px' }}>
                {isTamil ? 'பண்பாட்டு மரபுப் பாதுகாப்பு' : 'Cultural Heritage Preservation'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250, 247, 240, 0.75)', lineHeight: 1.6 }}>
                {isTamil ? 'பாரம்பரியக் கலைக் குடும்பங்களுக்கு வாழ்வாதாரம் அளித்து, அரிய நாட்டுப்புறக் கலைகளை அடுத்த தலைமுறைக்குக் கொண்டு செல்கிறோம்.' : 'Directly supporting traditional artist families and passing down rare oral and choreographic traditions to next-gen youth.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GALLERY PREVIEW */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge={t('gallery.badge')}
            tamilTitle={t('gallery.heading')}
            title={t('gallery.title')}
            desc={t('gallery.desc')}
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '20px'
          }}>
            {previewGallery.map((img) => (
              <div key={img.id} className="gallery-card" style={{ height: '260px' }}>
                <img src={img.image} alt={isTamil ? (img.tamilTitle || img.title) : img.title} />
                <div className="gallery-card-overlay">
                  <span style={{ fontSize: '0.74rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {img.category}
                  </span>
                  <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '0.95rem', color: '#FFE082', fontWeight: 700 }}>
                    {isTamil ? (img.tamilTitle || img.title) : img.title}
                  </div>
                  {isTamil && img.tamilTitle && (
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
                      {img.title}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/gallery" className="btn-maroon">
              <span>{t('common.viewAllGallery')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="section" style={{ background: 'var(--cream-bg)' }}>
        <div className="container">
          <SectionTitle
            badge={t('testimonials.badge')}
            tamilTitle={t('testimonials.heading')}
            title={t('testimonials.title')}
            desc={t('testimonials.desc')}
          />

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div>
                <div style={{ display: 'flex', gap: '4px', color: 'var(--gold-primary)', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-quote">
                  {isTamil ?
                    '"கலைமன்ற ஆசான்கள் நெறிப்படுத்திய பரதநாட்டிய மார்க்கம் ஆன்மீகப் பரவசத்தை ஏற்படுத்தியது. நிருத்தத்தின் துல்லியமும் மெய்ப்பாடுகளும் ஒட்டுமொத்த சபா பார்வையாளர்களையும் நெகிழ வைத்தது."'
                    : '"The Bharatanatyam Margam choreographed by the Kalamanram gurus was spiritually uplifting. The precision of Nritta and emotive Abhinaya moved our entire sabha audience."'
                  }
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--cream-border)' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--maroon-primary)',
                  color: 'var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  KN
                </div>
                <div>
                  <h5 style={{ margin: 0, fontSize: '1rem', color: 'var(--maroon-darkest)' }}>
                    {isTamil ? 'முனைவர் கே. நித்தியானந்தம்' : 'Dr. K. Nithyanandham'}
                  </h5>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {isTamil ? 'செயலாளர், சென்னை ஃபைன் ஆர்ட்ஸ் சபா' : 'Secretary, Chennai Fine Arts Sabha'}
                  </span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div>
                <div style={{ display: 'flex', gap: '4px', color: 'var(--gold-primary)', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-quote">
                  {isTamil ?
                    '"பொங்கல் திருவிழாவில் அவர்களின் கரகாட்டம் மற்றும் பறை இசை மக்கள் அனைவரையும் எழுந்து ஆட வைத்தது. உண்மையான கிராமிய நறுமணத்தோடு அமைந்த கலை விருந்து."'
                    : '"Their Folk Arts Troupe brought thunderous life to our Pongal festival with Karakattam and Parai Isai. Authentic, colorful, and thoroughly mesmerizing."'
                  }
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--cream-border)' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--maroon-primary)',
                  color: 'var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  SM
                </div>
                <div>
                  <h5 style={{ margin: 0, fontSize: '1rem', color: 'var(--maroon-darkest)' }}>
                    {isTamil ? 'எஸ். மீனாட்சி சுந்தரம்' : 'S. Meenakshi Sundaram'}
                  </h5>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {isTamil ? 'பாரம்பரிய கலை விழா இயக்குனர், மதுரை' : 'Heritage Festival Director, Madurai'}
                  </span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div>
                <div style={{ display: 'flex', gap: '4px', color: 'var(--gold-primary)', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-quote">
                  {isTamil ?
                    '"எங்கள் மகளின் அரங்கேற்றத்திற்காக வழங்கப்பட்ட நேரடி கர்நாடக இசைக்குழு தெய்வீக தரத்தை நிலைநிறுத்தியது. வித்வான்களின் இசை அரங்கத்தை மெய்சிலிர்க்க வைத்தது."'
                    : '"For our daughter\'s Arangetram, the live Carnatic orchestra provided by Iyal Isai Naadaga Kalamanram set a divine benchmark of acoustic purity."'
                  }
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--cream-border)' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--maroon-primary)',
                  color: 'var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  RV
                </div>
                <div>
                  <h5 style={{ margin: 0, fontSize: '1rem', color: 'var(--maroon-darkest)' }}>
                    {isTamil ? 'ராதிகா & வரதராஜன்' : 'Radhika & Varadharajan'}
                  </h5>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {isTamil ? 'கலை புரவலர்கள், கோயம்புத்தூர்' : 'Cultural Patrons, Coimbatore'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION */}
      <section className="section" style={{ background: '#FFFFFF', paddingTop: '20px' }}>
        <div className="container">
          <div className="cta-banner">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--gold-light)',
              fontSize: '0.86rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '14px'
            }}>
              <Sparkles size={14} />
              <span>{isTamil ? 'உங்கள் சுப நிகழ்ச்சிகளுக்கு எங்களின் கலைக்குழுவை அழைக்கலாம்' : 'Book Our Troupe For Your Auspicious Occasion'}</span>
            </div>

            <h2 style={{
              fontSize: '2.5rem',
              color: '#FFFFFF',
              marginBottom: '14px',
              fontFamily: isTamil ? 'var(--font-tamil)' : 'var(--font-heading)'
            }}>
              {isTamil ?
                'உங்கள் இல்ல விழாக்களை எங்களின் கலைகளால் சிறப்பித்திடுங்கள்'
                : 'Make Your Event Memorable With Our Cultural Performances'
              }
            </h2>

            <div style={{
              fontFamily: 'var(--font-tamil)',
              color: 'var(--gold-light)',
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '20px'
            }}>
              {isTamil ? 'திருமணங்கள், கோவில் பெருவிழாக்கள் மற்றும் சர்வதேச மாநாடுகளுக்கு' : 'Authentic Classical & Folk Productions Tailored to Perfection'}
            </div>

            <p style={{
              maxWidth: '680px',
              margin: '0 auto 32px',
              fontSize: '1.02rem',
              color: 'rgba(250, 247, 240, 0.85)',
              lineHeight: 1.7
            }}>
              {isTamil ?
                'மங்கல நாதஸ்வரம், செவ்வியல் பரதநாட்டியம், எழுச்சிமிகு கிராமிய கரகாட்டம் மற்றும் கம்பீரமான வரலாற்று நாடகங்களுடன் உங்கள் விழாவை மறக்க முடியாத நிகழ்வாக மாற்றுங்கள்.'
                : 'Whether it is a sacred wedding, temple brahmotsavam, school silver jubilee, or international corporate gala, we tailor classical dance, folk percussions, and divine music to perfection.'
              }
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <Link to="/enquiry" className="btn-gold" style={{ padding: '14px 34px', fontSize: '1rem' }}>
                <Sparkles size={18} />
                <span>{t('common.enquireNow')}</span>
              </Link>

              <Link to="/contact" className="btn-gold-outline" style={{ padding: '14px 30px', fontSize: '1rem' }}>
                <span>{isTamil ? 'தொடர்பு அலுவலகம்' : 'Contact Cultural Office'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
