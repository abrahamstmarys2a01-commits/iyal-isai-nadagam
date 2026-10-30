import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, Users, Clock, Award, ShieldCheck } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { servicesData } from '../data/services';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { isTamil } = useLanguage();

  return (
    <div className="services-page">
      {/* Banner */}
      <section className="events-header-bg">
        <div className="container">
          <SectionTitle
            dark={true}
            badge="Cultural Repertoires & Ensembles"
            tamilBadge="கலைத் தொகுப்புகள் & சேவைகள்"
            title="Our Performing Arts Services"
            tamilTitle="எங்களின் கலைப்பிரிவுகள் & மேடை நிகழ்ச்சிகள்"
            desc="Curated traditional arts packages for weddings, temple festivals, cultural conferences, and grand family celebrations."
            tamilDesc="திருமணங்கள், திருக்கோவில் திருவிழாக்கள் மற்றும் பண்பாட்டு மாநாடுகளுக்கான பாரம்பரிய கலைநிகழ்ச்சித் தொகுப்புகள்."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ background: 'var(--cream-bg)', paddingTop: '40px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '28px'
          }}>
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works / Booking Process */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="Seamless Cultural Curation"
            tamilBadge="எளிய முன்பதிவு முறை"
            title="How to Book Our Cultural Troupe"
            tamilTitle="கலைக்குழுவை முன்பதிவு செய்யும் 4 எளிய படிகள்"
            desc="Four simple steps to bring authentic Tamil cultural performances to your stage."
            tamilDesc="உங்கள் மேடையில் தெய்வீகத் தமிழ்க் கலைகளை அரங்கேற்ற நான்கு எளிய வழிமுறைகள்."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            <div className="ornate-card" style={{ padding: '30px 20px', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--maroon-primary)',
                color: 'var(--gold-light)',
                fontWeight: 800,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '2px solid var(--gold-primary)'
              }}>
                1
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--maroon-darkest)', marginBottom: '8px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                {isTamil ? 'விவரங்களை சமர்ப்பித்தல்' : 'Submit Enquiry'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {isTamil
                  ? 'உங்கள் விருப்பமான கலைப்பிரிவைத் (பரதநாட்டியம், கிராமியக் கலைகள், சங்கீதம்) தேர்வு செய்து படிவத்தை நிரப்பவும்.'
                  : 'Select your desired art form (Bharatanatyam, Folk, Carnatic) and submit event details through our form.'}
              </p>
            </div>

            <div className="ornate-card" style={{ padding: '30px 20px', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--maroon-primary)',
                color: 'var(--gold-light)',
                fontWeight: 800,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '2px solid var(--gold-primary)'
              }}>
                2
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--maroon-darkest)', marginBottom: '8px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                {isTamil ? 'நிகழ்ச்சித் திட்டம் வகுத்தல்' : 'Curated Proposal'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {isTamil
                  ? 'எங்கள் கலை இயக்குநர் கலைஞர்களின் எண்ணிக்கை, இசை வாத்தியங்கள் மற்றும் நேரத்திற்கு ஏற்ப திட்டத்தை வகுப்பார்.'
                  : 'Our artistic director prepares a customized repertoire with performer count, sound requirements, and timings.'}
              </p>
            </div>

            <div className="ornate-card" style={{ padding: '30px 20px', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--maroon-primary)',
                color: 'var(--gold-light)',
                fontWeight: 800,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '2px solid var(--gold-primary)'
              }}>
                3
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--maroon-darkest)', marginBottom: '8px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                {isTamil ? 'ஒத்திகை & மேடை ஏற்பாடு' : 'Rehearsal & Setup'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {isTamil
                  ? 'எங்கள் இசைக் கலைஞர்களும் நடனக் கலைஞர்களும் ஒலி அமைப்பு மற்றும் மேடையை நேர்த்தியாக சரிபார்க்கின்றனர்.'
                  : 'Our orchestra and dancers coordinate acoustics, stage markings, and ceremonial requirements.'}
              </p>
            </div>

            <div className="ornate-card" style={{ padding: '30px 20px', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--maroon-primary)',
                color: 'var(--gold-light)',
                fontWeight: 800,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '2px solid var(--gold-primary)'
              }}>
                4
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--maroon-darkest)', marginBottom: '8px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                {isTamil ? 'பிரம்மாண்ட மேடை அரங்கேற்றம்' : 'Grand Performance'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {isTamil
                  ? 'பார்வையாளர்களை மெய்சிலிர்க்க வைக்கும் கம்பீரமான கலை நிகழ்ச்சியை மேடையில் கண்டு மகிழுங்கள்.'
                  : 'Witness a breathtaking stage presentation that enchants guests and elevates your occasion into sacred memory.'}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/enquiry" className="btn-gold" style={{ padding: '14px 36px' }}>
              <Sparkles size={18} />
              <span>{isTamil ? 'கலைக்குழு முன்பதிவு செய்க' : 'Request Troupe Availability'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
