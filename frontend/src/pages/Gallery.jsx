import React, { useState, useEffect, useMemo } from 'react';
import { Tag, Eye } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Lightbox from '../components/Lightbox';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import '../styles/gallery.css';

export default function Gallery() {
  const { isTamil } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { key: 'All', en: 'All', ta: 'அனைத்தும்' },
    { key: 'Bharatanatyam', en: 'Bharatanatyam', ta: 'பரதநாட்டியம்' },
    { key: 'Folk Dance', en: 'Folk Dance', ta: 'கிராமியக் கலைகள்' },
    { key: 'Music', en: 'Music', ta: 'கர்நாடக சங்கீதம்' },
    { key: 'Drama', en: 'Drama', ta: 'நாடகம்' },
    { key: 'Cultural Events', en: 'Cultural Events', ta: 'பண்பாட்டு விழாக்கள்' }
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await api.getPublicGallery();
        if (res.success && res.data) {
          // Format objects with image property for lightbox
          const mapped = res.data.map((item, idx) => ({
            id: item._id || item.id || idx,
            category: item.category,
            title: item.title,
            tamilTitle: item.tamilTitle,
            location: item.location,
            image: item.imageUrl,
            description: item.description
          }));
          setItems(mapped);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const handleOpenLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="gallery-page">
      {/* Header Banner */}
      <section className="events-header-bg">
        <div className="container">
          <SectionTitle
            dark={true}
            badge="Performance Archival Gallery"
            tamilBadge="கலைப் புகைப்பட அரங்கம்"
            title="Cultural Performance Gallery"
            tamilTitle="எங்களின் வண்ணமிகு கலைக் களஞ்சியம்"
            desc="Explore mesmerizing photographs capturing the devotion of classical Bharatanatyam, the joy of folk percussions, and the intensity of historic Tamil theatre."
            tamilDesc="செவ்வியல் பரதநாட்டியம், துள்ளல் மிகுந்த கிராமியக் கலைகள் மற்றும் வரலாற்று நாடக மேடை புகைப்படக் காட்சிகள்."
          />
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="section" style={{ background: 'var(--cream-bg)', paddingTop: '36px' }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px'
          }}>
            {categories.map((cat) => {
              const count = cat.key === 'All' ? items.length : items.filter(g => g.category === cat.key).length;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                  style={{
                    padding: '8px 18px',
                    fontSize: '0.85rem'
                  }}
                >
                  <span>{isTamil ? cat.ta : cat.en}</span>
                  <span className="filter-count-badge">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Image Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: 'var(--text-muted)' }}>
                {isTamil ? 'புகைப்படங்கள் ஏற்றப்படுகின்றன...' : 'Loading gallery photos from database...'}
              </p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredImages.map((item, index) => (
                <div
                  key={item.id}
                  className="gallery-card"
                  onClick={() => handleOpenLightbox(index)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop';
                    }}
                  />

                  <div className="gallery-zoom-badge">
                    <Eye size={18} />
                  </div>

                  <div className="gallery-card-overlay">
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.74rem',
                      color: 'var(--gold-light)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '4px'
                    }}>
                      <Tag size={12} />
                      <span>{isTamil ? (categories.find(c => c.key === item.category)?.ta || item.category) : item.category}</span>
                    </div>

                    <h4 style={{
                      fontSize: '1.15rem',
                      color: '#FFFFFF',
                      margin: '2px 0 0',
                      lineHeight: 1.3,
                      fontFamily: isTamil ? 'var(--font-tamil)' : 'inherit'
                    }}>
                      {isTamil ? (item.tamilTitle || item.title) : item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {isTamil ? (
              <>காட்டப்படும் புகைப்படங்கள்: <strong>{filteredImages.length}</strong>. பெரிய அளவில் காண படத்தின் மீது கிளிக் செய்க.</>
            ) : (
              <>Showing <strong>{filteredImages.length}</strong> photographs in category <em>{activeCategory}</em>. Click any image to open high-resolution theatre mode.</>
            )}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox
          images={filteredImages}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
