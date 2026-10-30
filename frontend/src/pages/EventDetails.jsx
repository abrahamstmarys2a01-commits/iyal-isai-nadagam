import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Ticket,
  Music,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import Lightbox from '../components/Lightbox';
import '../styles/events.css';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await api.getEventById(id);
        if (res.success && res.data) {
          setEvent(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading event details from database...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--maroon-darkest)', marginBottom: '16px' }}>
          Event Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          The event you are searching for does not exist or has been removed.
        </p>
        <Link to="/events" className="btn-gold">
          <ArrowLeft size={16} />
          <span>Back to All Events</span>
        </Link>
      </div>
    );
  }

  const isEventUpcoming = (eventDateStr) => {
    const eventDate = new Date(eventDateStr);
    const now = new Date('2026-10-30');
    eventDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    return eventDate >= now;
  };

  const upcoming = isEventUpcoming(event.date);

  // Gallery items for lightbox
  const galleryItems = (event.gallery || []).map((imgUrl, i) => ({
    id: i,
    image: imgUrl,
    title: `${event.title} - Repertoire Photo ${i + 1}`,
    tamilTitle: event.tamilTitle,
    category: event.category,
    location: event.venue,
    description: `Performance moment from ${event.title}`
  }));

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="event-details-page">
      {/* Top Breadcrumb & Hero */}
      <section className="event-details-hero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.85rem' }}>
            <Link to="/events" style={{ color: 'var(--gold-light)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={14} />
              <span>Events</span>
            </Link>
            <ChevronRight size={14} style={{ opacity: 0.5 }} />
            <span style={{ color: 'rgba(250, 247, 240, 0.7)' }}>{event.category}</span>
            <ChevronRight size={14} style={{ opacity: 0.5 }} />
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{event.title}</span>
          </div>

          <div className="event-details-grid">
            <div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
                <span className="badge-category" style={{
                  background: 'rgba(201, 154, 53, 0.15)',
                  color: '#FFE082',
                  borderColor: 'rgba(201, 154, 53, 0.4)'
                }}>
                  {event.category}
                </span>

                {upcoming ? (
                  <span className="badge-upcoming">
                    <Sparkles size={12} /> Upcoming
                  </span>
                ) : (
                  <span className="badge-completed">
                    <CheckCircle2 size={12} /> Completed
                  </span>
                )}
              </div>

              {event.tamilTitle && (
                <div style={{
                  fontFamily: "var(--font-tamil)",
                  fontSize: '1.25rem',
                  color: 'var(--gold-light)',
                  fontWeight: 700,
                  marginBottom: '10px'
                }}>
                  {event.tamilTitle}
                </div>
              )}

              <h1 style={{
                fontSize: '2.5rem',
                lineHeight: 1.25,
                color: '#FFFFFF',
                marginBottom: '20px'
              }}>
                {event.title}
              </h1>

              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'rgba(250, 247, 240, 0.85)',
                marginBottom: '32px'
              }}>
                {event.shortDesc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <Link
                  to={`/enquiry?event=${encodeURIComponent(event.title)}`}
                  className="btn-gold"
                  style={{ padding: '13px 28px' }}
                >
                  <Sparkles size={18} />
                  <span>Enquire About This Event</span>
                </Link>

                <button
                  onClick={() => navigate('/events')}
                  className="btn-gold-outline"
                  style={{ padding: '13px 24px' }}
                >
                  <ArrowLeft size={18} />
                  <span>Back to Events</span>
                </button>
              </div>
            </div>

            <div>
              <div className="event-details-poster-wrap">
                <img
                  src={event.poster}
                  alt={event.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="section" style={{ background: 'var(--cream-bg)' }}>
        <div className="container">
          <div className="event-content-grid">
            <div>
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid var(--cream-border)',
                marginBottom: '32px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: 'var(--maroon-darkest)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: 'var(--gold-primary)' }}>✦</span> About the Performance
                </h3>

                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'var(--text-dark)',
                  marginBottom: '20px'
                }}>
                  {event.fullDesc || event.shortDesc}
                </p>

                <div style={{
                  background: 'var(--cream-bg)',
                  borderLeft: '4px solid var(--gold-primary)',
                  padding: '16px 20px',
                  borderRadius: '0 8px 8px 0',
                  fontSize: '0.92rem',
                  color: 'var(--text-muted)'
                }}>
                  <strong style={{ color: 'var(--maroon-primary)' }}>Cultural Significance: </strong>
                  This recital preserves ancient rhythmic and melodic patterns handed down across centuries of Tamil temple and stage heritage.
                </div>
              </div>

              {/* Event Schedule Timeline */}
              {event.schedule && event.schedule.length > 0 && (
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid var(--cream-border)',
                  marginBottom: '32px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    color: 'var(--maroon-darkest)',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: 'var(--gold-primary)' }}>✦</span> Program Itinerary & Schedule
                  </h3>

                  <div className="timeline-schedule">
                    {event.schedule.map((item, idx) => (
                      <div key={idx} className="timeline-item">
                        <div style={{
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: 'var(--gold-dark)',
                          marginBottom: '4px'
                        }}>
                          {item.time}
                        </div>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'var(--maroon-darkest)'
                        }}>
                          {item.item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Gallery */}
              {galleryItems.length > 0 && (
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid var(--cream-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    color: 'var(--maroon-darkest)',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: 'var(--gold-primary)' }}>✦</span> Performance Gallery (Click to Enlarge)
                  </h3>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '14px'
                  }}>
                    {galleryItems.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleOpenLightbox(idx)}
                        style={{
                          height: '140px',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          position: 'relative',
                          border: '1px solid rgba(201, 154, 53, 0.3)'
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="event-meta-card" style={{ position: 'sticky', top: '90px' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: 'var(--maroon-darkest)',
                  marginBottom: '10px',
                  paddingBottom: '12px',
                  borderBottom: '1.5px solid var(--cream-border)'
                }}>
                  Event Summary
                </h3>

                <div className="event-meta-row">
                  <div className="event-meta-icon"><Calendar size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date</div>
                    <strong style={{ fontSize: '0.96rem', color: 'var(--maroon-darkest)' }}>
                      {event.displayDate || event.date}
                    </strong>
                  </div>
                </div>

                <div className="event-meta-row">
                  <div className="event-meta-icon"><Clock size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Timing</div>
                    <strong style={{ fontSize: '0.96rem', color: 'var(--maroon-darkest)' }}>
                      {event.time}
                    </strong>
                  </div>
                </div>

                <div className="event-meta-row">
                  <div className="event-meta-icon"><MapPin size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Venue & Location</div>
                    <strong style={{ fontSize: '0.96rem', color: 'var(--maroon-darkest)' }}>
                      {event.venue}
                    </strong>
                  </div>
                </div>

                <div className="event-meta-row">
                  <div className="event-meta-icon"><Users size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Performing Troupe</div>
                    <strong style={{ fontSize: '0.96rem', color: 'var(--maroon-darkest)' }}>
                      {event.troupe || 'Kalamanram Cultural Repertory'}
                    </strong>
                  </div>
                </div>

                <div className="event-meta-row">
                  <div className="event-meta-icon"><Music size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Art Form</div>
                    <strong style={{ fontSize: '0.96rem', color: 'var(--maroon-darkest)' }}>
                      {event.artForm || event.category}
                    </strong>
                  </div>
                </div>

                <div className="event-meta-row">
                  <div className="event-meta-icon"><Ticket size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Entry & Passes</div>
                    <strong style={{ fontSize: '0.96rem', color: 'var(--maroon-darkest)' }}>
                      {event.entry || 'Open to All'}
                    </strong>
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <Link
                    to={`/enquiry?event=${encodeURIComponent(event.title)}`}
                    className="btn-gold"
                    style={{ width: '100%', padding: '12px 20px', fontSize: '0.92rem' }}
                  >
                    <Sparkles size={16} />
                    <span>Enquire About This Event</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox
          images={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0))}
        />
      )}
    </div>
  );
}
