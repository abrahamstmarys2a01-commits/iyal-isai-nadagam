import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useLanguage } from '../context/LanguageContext';
import '../styles/forms.css';

export default function Contact() {
  const { isTamil } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ submitted: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        submitted: false,
        error: isTamil ? 'தயவுசெய்து உங்கள் பெயர், மின்னஞ்சல் மற்றும் செய்தியை உள்ளிடவும்.' : 'Please fill in your name, email, and message.'
      });
      return;
    }

    setStatus({ submitted: true, error: null });
  };

  return (
    <div className="contact-page">
      {/* Banner */}
      <section className="events-header-bg">
        <div className="container">
          <SectionTitle
            dark={true}
            badge="Get in Touch"
            tamilBadge="தொடர்பு முகவரி"
            title="Contact Iyal Isai Naadaga Kalamanram"
            tamilTitle="எங்களை தொடர்பு கொள்ள"
            desc="Reach our cultural coordinators for troupe bookings, event schedules, artist collaborations, or heritage consultations."
            tamilDesc="கலைக்குழு முன்பதிவு, நிகழ்ச்சி நிரல் மற்றும் கலை ஆலோசனைகளுக்கு எங்கள் பண்பாட்டு ஒருங்கிணைப்பாளர்களைத் தொடர்பு கொள்ளுங்கள்."
          />
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section" style={{ background: 'var(--cream-bg)', paddingTop: '30px' }}>
        <div className="container">
          <div className="contact-main-grid">
            {/* Left: Contact Info Cards */}
            <div>
              <div style={{
                background: 'linear-gradient(145deg, #46091A 0%, #20030A 100%)',
                borderRadius: '20px',
                padding: 'clamp(20px, 4vw, 32px) clamp(14px, 3.5vw, 26px)',
                color: '#FAF7F0',
                border: '1.5px solid rgba(201, 154, 53, 0.4)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                marginBottom: '24px',
                overflow: 'hidden'
              }}>
                <div style={{
                  fontFamily: isTamil ? 'var(--font-tamil)' : 'var(--font-heading)',
                  color: 'var(--gold-light)',
                  fontWeight: 700,
                  fontSize: isTamil ? 'clamp(0.82rem, 2.5vw, 0.92rem)' : '0.92rem',
                  lineHeight: 1.45,
                  marginBottom: '8px'
                }}>
                  {isTamil ? 'இயல் இசை நாடகக் கலைமன்ற தலைமை அலுவலகம்' : 'IYAL ISAI NAADAGA KALAMANRAM HQ'}
                </div>
                <h3 style={{
                  fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
                  color: '#FFFFFF',
                  marginBottom: '20px',
                  fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit',
                  lineHeight: 1.35
                }}>
                  {isTamil ? 'பண்பாட்டு தலைமைச் செயலகம்' : 'Cultural Central Office'}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(201, 154, 53, 0.15)',
                      color: 'var(--gold-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(201, 154, 53, 0.3)'
                    }}>
                      <MapPin size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(250, 247, 240, 0.65)', marginBottom: '3px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                        {isTamil ? 'கலை வளாக முகவரி' : 'Cultural Campus Address'}
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FAF7F0', lineHeight: 1.55, fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit', wordBreak: 'break-word' }}>
                        {isTamil ? (
                          <>
                            முத்தமிழ் வளாகம், கலைக் கூடம்,<br />
                            TTK சாலை & சாந்தோம் நெடுஞ்சாலை, சென்னை 600 004,<br />
                            தமிழ்நாடு, இந்தியா.
                          </>
                        ) : (
                          <>
                            Muthamizh Valagam, Heritage Arts Corridor,<br />
                            TTK Road & Santhome High Road, Chennai 600 004,<br />
                            Tamil Nadu, India.
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(201, 154, 53, 0.15)',
                      color: 'var(--gold-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(201, 154, 53, 0.3)'
                    }}>
                      <Phone size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(250, 247, 240, 0.65)', marginBottom: '3px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                        {isTamil ? 'நேரடி தொலைபேசி எண்கள்' : 'Direct Phone Lines'}
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FAF7F0', lineHeight: 1.45, wordBreak: 'break-word' }}>
                        <a href="tel:+919876543210" style={{ color: '#FAF7F0', textDecoration: 'none' }}>+91 98765 43210</a>
                        {' / '}
                        <a href="tel:+919444012345" style={{ color: '#FAF7F0', textDecoration: 'none' }}>+91 94440 12345</a>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(201, 154, 53, 0.15)',
                      color: 'var(--gold-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(201, 154, 53, 0.3)'
                    }}>
                      <Mail size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(250, 247, 240, 0.65)', marginBottom: '3px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                        {isTamil ? 'அலுவலக மின்னஞ்சல்' : 'Official Email'}
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FAF7F0', wordBreak: 'break-all' }}>
                        <a href="mailto:contact@iyalisainaadagam.org" style={{ color: '#FAF7F0', textDecoration: 'none' }}>
                          contact@iyalisainaadagam.org
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(201, 154, 53, 0.15)',
                      color: 'var(--gold-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(201, 154, 53, 0.3)'
                    }}>
                      <Clock size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(250, 247, 240, 0.65)', marginBottom: '3px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                        {isTamil ? 'செயல்படும் நேரம்' : 'Office & Rehearsal Hours'}
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FAF7F0', lineHeight: 1.45, fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit', wordBreak: 'break-word' }}>
                        {isTamil ? 'திங்கள் – சனி: காலை 9:00 – மாலை 7:30' : 'Mon – Sat: 9:00 AM – 7:30 PM IST'}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '26px', paddingTop: '18px', borderTop: '1px solid rgba(201, 154, 53, 0.25)' }}>
                  <a
                    href="https://wa.me/919876543210?text=Vanakkam!%20I%20would%20like%20to%20connect%20with%20the%20Iyal%20Isai%20Naadaga%20Kalamanram%20team."
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      justifyContent: 'center',
                      whiteSpace: 'normal',
                      textAlign: 'center',
                      fontSize: 'clamp(0.82rem, 3.2vw, 0.92rem)',
                      lineHeight: 1.35,
                      gap: '8px',
                      fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit'
                    }}
                  >
                    <MessageCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{isTamil ? 'வாட்ஸ்அப் கலை ஒருங்கிணைப்பாளர்' : 'WhatsApp Cultural Desk'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Interactive Message Form */}
            <div className="form-wrapper-card">
              <h3 style={{
                fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
                color: 'var(--maroon-darkest)',
                marginBottom: '8px',
                fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit',
                lineHeight: 1.3
              }}>
                {isTamil ? 'எங்களுக்கு செய்தி அனுப்புங்கள்' : 'Send Us a Message'}
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: 'clamp(0.85rem, 2.5vw, 0.92rem)',
                marginBottom: '24px',
                fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit',
                lineHeight: 1.55
              }}>
                {isTamil ? 'நிகழ்ச்சி டிக்கெட்டுகள், சபா காலண்டர் அல்லது கலைப் பயிற்சிகள் பற்றிய கேள்விகளுக்கு எங்களை அணுகுங்கள்.' : 'Have a query regarding concert tickets, upcoming sabha schedules, or artistic training? Leave us a note.'}
              </p>

              {status.submitted ? (
                <div style={{
                  padding: '30px 20px',
                  background: 'rgba(19, 111, 56, 0.08)',
                  border: '1.5px solid #177C44',
                  borderRadius: '14px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: '#177C44',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px'
                  }}>
                    <CheckCircle2 size={30} />
                  </div>
                  <h4 style={{ color: '#105930', fontSize: '1.3rem', margin: '0 0 8px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                    {isTamil ? 'செய்தி பெறப்பட்டது!' : 'Message Received!'}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: '0 0 16px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit', lineHeight: 1.5 }}>
                    {isTamil ? `நன்றி ${formData.name}. எங்கள் கலை ஒருங்கிணைப்பாளர் விரைவில் உங்களைத் தொடர்புகொள்வார்.` : `Thank you, ${formData.name}. Our cultural coordinator will get back to you shortly.`}
                  </p>
                  <button
                    onClick={() => {
                      setStatus({ submitted: false, error: null });
                      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                    }}
                    className="btn-maroon-outline"
                    style={{
                      padding: '8px 20px',
                      fontSize: '0.85rem',
                      fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit',
                      whiteSpace: 'normal',
                      maxWidth: '100%'
                    }}
                  >
                    {isTamil ? 'மறுபடியும் செய்தி அனுப்புக' : 'Send Another Note'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {status.error && (
                    <div style={{
                      padding: '12px 16px',
                      background: '#FFF3F3',
                      border: '1px solid #D32F2F',
                      borderRadius: '8px',
                      color: '#D32F2F',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '18px',
                      fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit'
                    }}>
                      <AlertCircle size={16} style={{ flexShrink: 0 }} />
                      <span style={{ lineHeight: 1.4 }}>{status.error}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" htmlFor="name" style={isTamil ? { fontFamily: 'var(--font-tamil)', lineHeight: 1.35 } : {}}>
                      {isTamil ? 'உங்கள் பெயர் *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isTamil ? "எ.கா. மீனா சுந்தரம்" : "e.g. Meena Sundaram"}
                      className="form-input"
                      style={isTamil ? { fontFamily: 'var(--font-tamil)' } : {}}
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone" style={isTamil ? { fontFamily: 'var(--font-tamil)', lineHeight: 1.35 } : {}}>
                        {isTamil ? 'தொலைபேசி எண்' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email" style={isTamil ? { fontFamily: 'var(--font-tamil)', lineHeight: 1.35 } : {}}>
                        {isTamil ? 'மின்னஞ்சல் முகவரி *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@domain.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="subject" style={isTamil ? { fontFamily: 'var(--font-tamil)', lineHeight: 1.35 } : {}}>
                      {isTamil ? 'பொருள் / விசாரணை வகை' : 'Subject / Inquiry Type'}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={isTamil ? "எ.கா. மார்கழி சபா நிகழ்ச்சி / முன்பதிவு" : "e.g. Margazhi Sabha Ticket Query / Arangetram"}
                      className="form-input"
                      style={isTamil ? { fontFamily: 'var(--font-tamil)' } : {}}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message" style={isTamil ? { fontFamily: 'var(--font-tamil)', lineHeight: 1.35 } : {}}>
                      {isTamil ? 'செய்தி விவரம் *' : 'Message *'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={isTamil ? "உங்கள் செய்தியை இங்கே உள்ளிடவும்..." : "Write your message here..."}
                      className="form-textarea"
                      style={isTamil ? { fontFamily: 'var(--font-tamil)' } : {}}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                    style={{
                      width: '100%',
                      padding: '13px 18px',
                      marginTop: '10px',
                      justifyContent: 'center',
                      whiteSpace: 'normal',
                      textAlign: 'center',
                      fontSize: 'clamp(0.9rem, 2.5vw, 0.98rem)',
                      fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit',
                      gap: '8px'
                    }}
                  >
                    <Send size={16} style={{ flexShrink: 0 }} />
                    <span>{isTamil ? 'செய்தியை அனுப்புக' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
