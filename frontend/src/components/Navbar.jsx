import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronRight, Sparkles, Globe } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import '../styles/navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, isTamil, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.events'), path: '/events' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <>
      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        {/* Top Info Announcement Strip */}
        <div className="navbar-top-strip">
          <div className="container navbar-top-content">
            <div className="top-strip-left">
              <span className="top-strip-tamil">
                {t('nav.topAnnouncement')}
              </span>
              <div className="top-strip-item">
                <Phone size={13} />
                <span>+91 98765 43210</span>
              </div>
              <div className="top-strip-item">
                <Mail size={13} />
                <span>info@kalamanram.org</span>
              </div>
            </div>
            <div className="top-strip-right">
              <Link to="/enquiry" style={{ color: 'var(--gold-light)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={12} />
                <span>{t('nav.bookTroupe')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Sticky Nav */}
        <div className="navbar-main">
          <div className="container navbar-content">
            <Logo size="medium" light={true} />

            {/* Desktop Navigation */}
            <nav className="nav-desktop">
              <ul className="nav-links-desktop">
                {navItems.map((item) => (
                  <li key={item.path} className="nav-link-item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Desktop CTA & Language Switcher */}
            <div className="nav-actions-desktop">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLang}
                className="language-switcher-pill"
                id="btn-lang-toggle"
                title={isTamil ? "Click to switch to English" : "தமிழுக்கு மாற்ற கிளிக் செய்க"}
              >
                <Globe size={14} />
                <span className={isTamil ? 'lang-badge active' : 'lang-badge'}>தமிழ்</span>
                <span className="lang-separator">|</span>
                <span className={!isTamil ? 'lang-badge active' : 'lang-badge'}>ENG</span>
              </button>

              <Link to="/enquiry" className="btn-gold" id="btn-navbar-enquire">
                <Sparkles size={16} />
                <span>{t('common.enquireNow')}</span>
              </Link>

              {/* Hamburger Button */}
              <button
                className="hamburger-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <Logo size="small" light={true} />
            <button className="drawer-close-btn" onClick={() => setMobileMenuOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Mobile Language Switcher */}
          <div className="mobile-lang-wrapper">
            <button
              type="button"
              onClick={toggleLang}
              className="language-switcher-pill"
              style={{ padding: '6px 18px', fontSize: '0.9rem' }}
            >
              <Globe size={16} />
              <span className={isTamil ? 'lang-badge active' : 'lang-badge'}>தமிழ்</span>
              <span className="lang-separator">/</span>
              <span className={!isTamil ? 'lang-badge active' : 'lang-badge'}>English</span>
            </button>
          </div>

          <ul className="mobile-nav-links">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <span>{item.name}</span>
                  <ChevronRight size={16} style={{ opacity: 0.6 }} />
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ marginBottom: '24px' }}>
            <Link to="/enquiry" className="btn-gold" style={{ width: '100%' }}>
              <Sparkles size={16} />
              <span>{t('common.enquireNow')}</span>
            </Link>
          </div>

          <div className="mobile-drawer-footer">
            <div className="mobile-contact-info">
              <div className="mobile-contact-item">
                <Phone size={14} style={{ color: 'var(--gold-light)' }} />
                <span>+91 98765 43210</span>
              </div>
              <div className="mobile-contact-item">
                <Mail size={14} style={{ color: 'var(--gold-light)' }} />
                <span>contact@kalamanram.org</span>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(250,247,240,0.5)', textAlign: 'center' }}>
              © 2026 Iyal Isai Naadaga Kalamanram
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
