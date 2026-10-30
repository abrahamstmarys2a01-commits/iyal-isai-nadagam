import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Calendar, Sparkles, CheckCircle2, Filter, AlertCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import EventCard from '../components/EventCard';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import '../styles/events.css';

export default function Events() {
  const { isTamil } = useLanguage();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'upcoming', 'completed'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = [
    { key: 'All', en: 'All', ta: 'அனைத்தும்' },
    { key: 'Bharatanatyam', en: 'Bharatanatyam', ta: 'பரதநாட்டியம்' },
    { key: 'Carnatic Music', en: 'Carnatic Music', ta: 'கர்நாடக சங்கீதம்' },
    { key: 'Folk Dance', en: 'Folk Dance', ta: 'கிராமியக் கலைகள்' },
    { key: 'Drama', en: 'Drama', ta: 'நாடகம்' },
    { key: 'Cultural Events', en: 'Cultural Events', ta: 'பண்பாட்டு விழாக்கள்' }
  ];

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.getPublicEvents();
      if (res.success && res.data) {
        setEvents(res.data);
      }
    } catch (err) {
      console.error('Failed to load events from API, falling back to static cache:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const isEventUpcoming = (eventDateStr) => {
    const eventDate = new Date(eventDateStr);
    const now = new Date('2026-10-30');
    eventDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    return eventDate >= now;
  };

  // Filter and search logic
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Status Filter
      const upcoming = isEventUpcoming(event.date);
      if (statusFilter === 'upcoming' && !upcoming) return false;
      if (statusFilter === 'completed' && upcoming) return false;

      // 2. Category Filter
      if (categoryFilter !== 'All' && event.category !== categoryFilter) {
        return false;
      }

      // 3. Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title?.toLowerCase().includes(query);
        const matchesTamil = event.tamilTitle?.toLowerCase().includes(query);
        const matchesVenue = event.venue?.toLowerCase().includes(query);
        const matchesDesc = event.shortDesc?.toLowerCase().includes(query);
        const matchesCategory = event.category?.toLowerCase().includes(query);

        if (!matchesTitle && !matchesTamil && !matchesVenue && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [events, searchQuery, statusFilter, categoryFilter]);

  // Counts
  const upcomingCount = useMemo(() => {
    return events.filter((e) => isEventUpcoming(e.date)).length;
  }, [events]);

  const completedCount = useMemo(() => {
    return events.filter((e) => !isEventUpcoming(e.date)).length;
  }, [events]);

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEvents.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('All');
  };

  return (
    <div className="events-page">
      {/* Page Header Banner */}
      <section className="events-header-bg">
        <div className="container">
          <SectionTitle
            dark={true}
            badge="Stage Calendars & Concerts"
            tamilBadge="நிகழ்ச்சி நிரல் & கச்சேரிகள்"
            title="Our Events & Performances"
            tamilTitle="எங்களின் கலை நிகழ்வுகள் & திருவிழாக்கள்"
            desc="Explore our forthcoming classical concerts, dance ballets, folk carnivals, and historical archive of celebrated stage offerings."
            tamilDesc="வரவிருக்கும் செவ்வியல் நாட்டிய நாடகங்கள், கர்நாடக இசைக் கச்சேரிகள் மற்றும் கிராமிய திருவிழாக்களைக் காண்க."
          />
        </div>
      </section>

      {/* Main Content & Controls Container */}
      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          {/* Controls: Search & Filters Panel */}
          <div className="events-controls-panel">
            <div className="search-input-box">
              <Search size={20} className="search-icon-left" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isTamil ? "நிகழ்ச்சி, கலைஞர், ராகம், இடம் வாரியாகத் தேடுக (எ.கா. நாரத கான சபா, பரதநாட்டியம்)..." : "Search events by title, raga, venue (e.g. Narada Gana Sabha, Madurai, Bharatanatyam)..."}
                aria-label="Search events"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  title={isTamil ? "தேடலை அழி" : "Clear search"}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Pills Row */}
            <div className="filter-pills-row">
              <div className="filter-group">
                <button
                  onClick={() => { setStatusFilter('all'); setVisibleCount(6); }}
                  className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
                >
                  <Calendar size={14} />
                  <span>{isTamil ? 'அனைத்தும்' : 'All Events'}</span>
                  <span className="filter-count-badge">{events.length}</span>
                </button>

                <button
                  onClick={() => { setStatusFilter('upcoming'); setVisibleCount(6); }}
                  className={`filter-btn ${statusFilter === 'upcoming' ? 'active' : ''}`}
                >
                  <Sparkles size={14} />
                  <span>{isTamil ? 'வரவிருப்பவை' : 'Upcoming'}</span>
                  <span className="filter-count-badge">{upcomingCount}</span>
                </button>

                <button
                  onClick={() => { setStatusFilter('completed'); setVisibleCount(6); }}
                  className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
                >
                  <CheckCircle2 size={14} />
                  <span>{isTamil ? 'நிறைவுற்றவை' : 'Completed'}</span>
                  <span className="filter-count-badge">{completedCount}</span>
                </button>
              </div>

              <div className="filter-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.86rem', marginRight: '4px' }}>
                  <Filter size={14} style={{ color: 'var(--gold-dark)' }} />
                  <span>{isTamil ? 'கலைப் பிரிவு:' : 'Art Form:'}</span>
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => { setCategoryFilter(cat.key); setVisibleCount(6); }}
                    className={`filter-btn ${categoryFilter === cat.key ? 'active' : ''}`}
                    style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                  >
                    {isTamil ? cat.ta : cat.en}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Count and Active Filters readout */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '24px 0 20px',
            fontSize: '0.9rem',
            color: 'var(--text-muted)'
          }}>
            <div>
              {isTamil ? (
                <>
                  காட்டப்படும் நிகழ்வுகள்: <strong style={{ color: 'var(--maroon-darkest)' }}>{filteredEvents.length}</strong>
                  {categoryFilter !== 'All' && ` (${categories.find(c => c.key === categoryFilter)?.ta || categoryFilter})`}
                  {searchQuery && ` (தேடல்: "${searchQuery}")`}
                </>
              ) : (
                <>
                  Showing <strong style={{ color: 'var(--maroon-darkest)' }}>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'event' : 'events'}
                  {statusFilter !== 'all' && ` in ${statusFilter}`}
                  {categoryFilter !== 'All' && ` (${categoryFilter})`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </>
              )}
            </div>

            {(statusFilter !== 'all' || categoryFilter !== 'All' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                style={{
                  background: 'transparent',
                  color: 'var(--maroon-primary)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                {isTamil ? 'வடிகட்டிகளை மீட்டமை' : 'Reset All Filters'}
              </button>
            )}
          </div>

          {/* Events Grid or Empty State */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '3px solid var(--cream-border)',
                borderTopColor: 'var(--maroon-primary)',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 12px'
              }} />
              <p style={{ color: 'var(--text-muted)' }}>
                {isTamil ? 'கலை நிகழ்வுகள் ஏற்றப்படுகின்றன...' : 'Fetching cultural events from database...'}
              </p>
            </div>
          ) : visibleEvents.length > 0 ? (
            <>
              <div className="events-grid">
                {visibleEvents.map((event) => (
                  <EventCard key={event._id || event.id} event={event} />
                ))}
              </div>

              {hasMore && (
                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                  <button onClick={handleLoadMore} className="btn-maroon">
                    <span>{isTamil ? `மேலும் நிகழ்வுகளைக் காண்க (${filteredEvents.length - visibleCount})` : `Load More Events (${filteredEvents.length - visibleCount} remaining)`}</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="events-empty-state">
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(201, 154, 53, 0.15)',
                color: 'var(--maroon-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <AlertCircle size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--maroon-darkest)', marginBottom: '8px' }}>
                {isTamil ? 'நிகழ்வுகள் எதுவும் காணப்படவில்லை' : 'No Events Found'}
              </h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 20px' }}>
                {isTamil ? 'உங்கள் தேடலுக்குரிய நிகழ்வுகள் எதுவும் இல்லை. தயவுசெய்து மற்ற கலைப்பிரிவை தேர்வு செய்யவும்.' : 'We couldn\'t find any events matching your selected criteria. Try adjusting your search keywords or switching filters.'}
              </p>
              <button onClick={handleResetFilters} className="btn-gold">
                <span>{isTamil ? 'அனைத்து நிகழ்வுகளையும் காண்க' : 'View All Events'}</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
