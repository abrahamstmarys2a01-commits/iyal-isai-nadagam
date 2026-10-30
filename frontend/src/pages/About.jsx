import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  BookOpen,
  Music,
  Theater,
  CheckCircle,
  Users,
  Compass,
  ArrowRight,
  Heart
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { isTamil } = useLanguage();

  return (
    <div className="about-page">
      {/* Header Banner */}
      <section className="events-header-bg">
        <div className="container">
          <SectionTitle
            dark={true}
            badge="Our Heritage & Philosophy"
            tamilBadge="எங்கள் தொன்மை & நற்பண்புகள்"
            title="About Iyal Isai Naadaga Kalamanram"
            tamilTitle="இயல் இசை நாடகக் கலைமன்றம் பற்றி"
            desc="Dedicated to preserving Tamil culture through authentic classical dances, carnatic music, and time-honored theatrical arts."
            tamilDesc="செவ்வியல் நடனம், கர்நாடக சங்கீதம் மற்றும் வரலாற்று மேடை நாடகங்கள் வழி தமிழ் மரபைப் போற்றி வளர்க்கிறோம்."
          />
        </div>
      </section>

      {/* 1. History & Genesis */}
      <section className="section" style={{ background: 'var(--cream-bg)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(28px, 4vw, 50px)',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                fontFamily: isTamil ? 'var(--font-tamil)' : 'var(--font-heading)',
                color: 'var(--gold-dark)',
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '8px',
                letterSpacing: '0.04em'
              }}>
                {isTamil ? 'முத்தமிழின் தொன்மை & கலைப் பாரம்பரியம்' : 'CULTURAL LINEAGE & GENESIS'}
              </div>

              <h2 style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                color: 'var(--maroon-darkest)',
                marginBottom: '20px',
                lineHeight: 1.3,
                fontFamily: isTamil ? 'var(--font-tamil)' : 'var(--font-heading)'
              }}>
                {isTamil
                  ? 'தமிழ் கலைகளின் அழியாப் பெருமைக்கான கலைக் கூடம்'
                  : 'A Lifelong Sanctuary for Tamil Performing Arts'}
              </h2>

              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-dark)', marginBottom: '16px' }}>
                {isTamil
                  ? '1989 ஆம் ஆண்டு தொடங்கப்பட்ட இயல் இசை நாடகக் கலைமன்றம், தமிழ்நாட்டின் தலைசிறந்த நாட்டிய ஆசான்கள், இசைக் கலைஞர்கள் மற்றும் நாடக வித்வான்களால் உருவாக்கப்பட்டது.'
                  : 'Established in 1989 in the cultural corridor of Tamil Nadu, Iyal Isai Naadaga Kalamanram was conceived by a fellowship of veteran classical exponents, temple nattuvanars, and theatre playwrights.'}
              </p>

              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '20px' }}>
                {isTamil
                  ? 'பண்டைய தமிழ் மரபில் கலைகள் மூன்று புனிதப் பிரிவுகளாக வகுக்கப்பட்டன — இயல் (சொல்லும் எழுத்தும்), இசை (தெய்வீக நாதம்), நாடகம் (காட்சி மெய்ப்பாடுகள்). இந்த மூன்று அருவிகளையும் டிஜிட்டல் உலகில் அழியாமல் காத்து அடுத்த தலைமுறையிடம் சேர்ப்பதே எங்கள் லட்சியம்.'
                  : 'In ancient Tamil civilization, artistic expression was classified into three sacred branches—Muthamizh: இயல் (Iyal - Literature), இசை (Isai - Divine Melody), and நாடகம் (Naadagam - Visual Drama). We exist to ensure that none of these three streams fade in an increasingly modern world.'}
              </p>

              <div style={{
                borderLeft: '4px solid var(--maroon-primary)',
                background: '#FFFFFF',
                padding: '16px 20px',
                borderRadius: '0 12px 12px 0',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  fontStyle: isTamil ? 'normal' : 'italic',
                  color: 'var(--maroon-darkest)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit'
                }}>
                  {isTamil
                    ? '“கலை என்பது வெறும் பொழுதுபோக்கு அல்ல; அது ஒரு தேசத்தின் ஆன்மாவின் வெளிப்பாடு.”'
                    : '"Art is not mere entertainment; it is the manifestation of a civilization’s soul."'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isTamil
                    ? '— கலை மன்ற நெறிமுறை'
                    : '— Kalamanram Guiding Proverb'}
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '2px solid rgba(201, 154, 53, 0.4)',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <img
                  src="/assets/images/iyal_isai_nadagam_hero.jpg"
                  alt="Iyal Isai Naadaga Kalamanram Vintage Classical Arts"
                  style={{ width: '100%', height: 'clamp(260px, 45vw, 440px)', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="section" style={{
        background: 'linear-gradient(180deg, #380715 0%, #1F030A 100%)',
        color: '#FAF7F0',
        borderTop: '2px solid rgba(201, 154, 53, 0.3)',
        borderBottom: '2px solid rgba(201, 154, 53, 0.3)'
      }}>
        <div className="container">
          <SectionTitle
            dark={true}
            badge="Our Guiding Light"
            tamilBadge="வழிகாட்டும் நன்னெறிகள்"
            title="Mission, Vision & Core Values"
            tamilTitle="எங்களின் இலக்கு, தொலைநோக்கு & விழுமியங்கள்"
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px'
          }}>
            {/* Mission */}
            <div className="maroon-card" style={{ padding: '36px 28px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(201, 154, 53, 0.2)',
                color: 'var(--gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '1px solid rgba(201, 154, 53, 0.4)'
              }}>
                <Compass size={26} />
              </div>

              <div style={{ fontFamily: isTamil ? 'var(--font-tamil)' : 'var(--font-sans)', color: 'var(--gold-light)', fontSize: '0.88rem', fontWeight: 700 }}>
                {isTamil ? 'எங்களின் இலக்கு' : 'OUR MISSION'}
              </div>
              <h3 style={{ fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '14px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                {isTamil ? 'தூய கலைப் பணி' : 'Preserve Authenticity'}
              </h3>

              <p style={{ color: 'rgba(250, 247, 240, 0.85)', fontSize: '0.94rem', lineHeight: 1.75 }}>
                {isTamil
                  ? 'தமிழ் பாரம்பரிய செவ்வியல் மற்றும் கிராமிய கலை வடிவங்களை எந்தவித மாற்றமும் இன்றி, அதன் தூய இலக்கணத்தோடு புதிய தலைமுறையினருக்கும் உலக மேடைகளுக்கும் கொண்டு சேர்ப்பது.'
                  : 'To systematically preserve, teach, and stage Tamil classical and folk performing arts with absolute aesthetic and technical fidelity, making them vibrant and accessible globally.'}
              </p>
            </div>

            {/* Vision */}
            <div className="maroon-card" style={{ padding: '36px 28px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(201, 154, 53, 0.2)',
                color: 'var(--gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '1px solid rgba(201, 154, 53, 0.4)'
              }}>
                <Sparkles size={26} />
              </div>

              <div style={{ fontFamily: isTamil ? 'var(--font-tamil)' : 'var(--font-sans)', color: 'var(--gold-light)', fontSize: '0.88rem', fontWeight: 700 }}>
                {isTamil ? 'எங்களின் தொலைநோக்கு' : 'OUR VISION'}
              </div>
              <h3 style={{ fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '14px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                {isTamil ? 'உலகளாவிய அங்கீகாரம்' : 'Global Cultural Beacon'}
              </h3>

              <p style={{ color: 'rgba(250, 247, 240, 0.85)', fontSize: '0.94rem', lineHeight: 1.75 }}>
                {isTamil
                  ? 'இயல், இசை, நாடகம் என்ற முத்தமிழின் பெருமையை உலக அரங்கில் முதன்மை நிலைக்கு உயர்த்தி, தமிழர் கலை மரபின் உலகளாவிய பாதுகாவலனாகத் திகழ்வது.'
                  : 'To become the premier global institutional custodian for the triad of Muthamizh, bridging ancient temple dance grammar and village folk expressions on international stages.'}
              </p>
            </div>

            {/* Values */}
            <div className="maroon-card" style={{ padding: '36px 28px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(201, 154, 53, 0.2)',
                color: 'var(--gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '1px solid rgba(201, 154, 53, 0.4)'
              }}>
                <Heart size={26} />
              </div>

              <div style={{ fontFamily: isTamil ? 'var(--font-tamil)' : 'var(--font-sans)', color: 'var(--gold-light)', fontSize: '0.88rem', fontWeight: 700 }}>
                {isTamil ? 'பண்பாட்டு நற்பண்புகள்' : 'CORE VALUES'}
              </div>
              <h3 style={{ fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '14px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                {isTamil ? 'புனிதக் கோட்பாடுகள்' : 'Tradition & Devotion'}
              </h3>

              <p style={{ color: 'rgba(250, 247, 240, 0.85)', fontSize: '0.94rem', lineHeight: 1.75 }}>
                {isTamil
                  ? 'கலை பக்தி (Bhakti), தீவிர சாதனை (Sadhana), பாரம்பரிய மரபுத் தூய்மை (Sampradaya), மற்றும் கிராமியக் கலைஞர்களின் வாழ்வாதாரப் பாதுகாப்பு.'
                  : 'Devotion (Bhakti), Artistic Discipline (Sadhana), Traditional Authenticity (Sampradaya), and Patron Welfare for rural folk exponents and their lineages.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Triad of Muthamizh */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <SectionTitle
            badge="The Three Streams"
            tamilBadge="முத்தமிழின் பெருமை"
            title="The Sacred Pillars: Iyal, Isai, Naadagam"
            tamilTitle="மூன்று புனிதத் தூண்கள்: இயல், இசை, நாடகம்"
            desc="How our organization synthesizes the threefold heritage of Tamil culture."
            tamilDesc="தமிழர் பண்பாட்டின் முப்பெரும் கூறுகளையும் எமது கலைமன்றம் எவ்வாறு பேணி வளர்க்கிறது."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px'
          }}>
            {/* Iyal */}
            <div className="ornate-card" style={{ padding: '0', textAlign: 'left', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/assets/images/iyal_vintage.jpg"
                  alt="இயல் - சங்கப் புலவர் & ஓலைச்சுவடி இலக்கிய மரபு"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(116, 21, 46, 0.9)',
                  color: 'var(--gold-light)',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em'
                }}>
                  {isTamil ? 'இயல்' : 'IYAL • LITERATURE'}
                </div>
              </div>
              <div style={{ padding: '26px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--maroon-darkest)', marginBottom: '4px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                  {isTamil ? 'இயல் (இலக்கிய மரபு)' : 'Iyal (Literature & Poetry)'}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 600, marginBottom: '12px' }}>
                  {isTamil ? 'கவியரங்கம், இலக்கியச் சொற்பொழிவு & ஓலைச்சுவடி ஆய்வு' : 'Poetry, Discourse & Classical Text'}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                  {isTamil
                    ? 'தொல்காப்பியம், சிலப்பதிகாரம், திருக்குறள், மணிமேகலை உள்ளிட்ட செவ்வியல் சங்க இலக்கியங்களை ஆய்வரங்குகள், கவியரங்கங்கள் மற்றும் மேடை நாடக வடிவங்கள் வழி புத்துயிர் பெறச் செய்கிறோம்.'
                    : 'Reviving Sangam literary works (Tolkappiyam, Silappadikaram, Thirukkural, Manimekalai) through scholarly seminars, poetic oration, and scriptural adaptations for stage.'}
                </p>
              </div>
            </div>

            {/* Isai */}
            <div className="ornate-card" style={{ padding: '0', textAlign: 'left', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/assets/images/isai_vintage.jpg"
                  alt="இசை - சரஸ்வதி வீணை & கோவில் சங்கீத கச்சேரி"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(116, 21, 46, 0.9)',
                  color: 'var(--gold-light)',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em'
                }}>
                  {isTamil ? 'இசை' : 'ISAI • MUSIC'}
                </div>
              </div>
              <div style={{ padding: '26px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--maroon-darkest)', marginBottom: '4px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                  {isTamil ? 'இசை (சங்கீத மரபு)' : 'Isai (Carnatic & Folk Melodies)'}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 600, marginBottom: '12px' }}>
                  {isTamil ? 'கர்நாடகக் கச்சேரி, மங்கல இசை & கிராமிய நாதம்' : 'Carnatic, Mangala & Folk Melodies'}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                  {isTamil
                    ? '72 மேளகர்த்தா ராகங்கள், தேவாரம், திருவாசகம், மங்கல நாதஸ்வரம்-தவில் மற்றும் சரஸ்வதி வீணையின் தெய்வீக கமகங்களை அடுத்த தலைமுறைக்கு பயிற்றுவித்து அரங்கேற்றுகிறோம்.'
                    : 'Nurturing the 72 Melakarta ragas, sacred Thevaram hymns, auspicious Nadaswaram Mallaris, and the resonant microtonal gamakas of the antique Saraswathi Veena.'}
                </p>
              </div>
            </div>

            {/* Naadagam */}
            <div className="ornate-card" style={{ padding: '0', textAlign: 'left', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/assets/images/nadagam_vintage.jpg"
                  alt="நாடகம் - வரலாற்று மேடை நாடகம் & வேந்தர் வேடம்"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(116, 21, 46, 0.9)',
                  color: 'var(--gold-light)',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em'
                }}>
                  {isTamil ? 'நாடகம்' : 'NAADAGAM • THEATRE'}
                </div>
              </div>
              <div style={{ padding: '26px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--maroon-darkest)', marginBottom: '4px', fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit' }}>
                  {isTamil ? 'நாடகம் (நாட்டிய நாடக மரபு)' : 'Naadagam (Dance Theatre & Koothu)'}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 600, marginBottom: '12px' }}>
                  {isTamil ? 'செவ்வியல் நாட்டிய நாடகம் & தெருக்கூத்து' : 'Dance Theatre & Therukoothu'}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                  {isTamil
                    ? 'தமிழ் வரலாற்று காவியங்கள், முழுமையான பரதநாட்டிய மார்க்கங்கள் மற்றும் வண்ணமயமான கிராமிய தெருக்கூத்து கலைகளை பிரம்மாண்ட மேடைகளில் உயிர்ப்பிக்கிறோம்.'
                    : 'Stage presentations of Tamil historical epics, full Bharatanatyam Margam ballets, and the vibrant open-air nocturnal spectacle of traditional Therukoothu.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="section" style={{ background: 'var(--cream-bg)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            background: '#FFFFFF',
            border: '2px solid rgba(201, 154, 53, 0.35)',
            borderRadius: '20px',
            padding: '48px 32px',
            maxWidth: '820px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              color: 'var(--maroon-darkest)',
              marginBottom: '12px',
              fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit'
            }}>
              {isTamil
                ? 'எங்கள் கலைக்குழுக்களுடன் இணையுங்கள்'
                : 'Collaborate With Our Cultural Troupes'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.7 }}>
              {isTamil
                ? 'உங்கள் இல்ல சுபநிகழ்ச்சிகள் மற்றும் திருக்கோவில் திருவிழாக்களில் தெய்வீக கலை அனுபவத்தை அரங்கேற்ற எங்களை அழையுங்கள்.'
                : 'Discover how our artists can bring an atmosphere of divine tradition and unmatched artistic grandeur to your venue.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/enquiry" className="btn-gold">
                <span>{isTamil ? 'கலைக்குழு முன்பதிவு' : 'Book a Performance'}</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-maroon-outline">
                <span>{isTamil ? 'மன்ற அலுவலக தொடர்பு' : 'Contact Mandram Office'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
