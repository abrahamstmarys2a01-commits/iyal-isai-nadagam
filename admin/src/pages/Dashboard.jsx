import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  Mail,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import '../styles/admin.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.getDashboardStats();
      if (res && res.success) {
        setData(res);
        return;
      }

      // If unauthorized / token expired, redirect to login
      if (res && res.message && (res.message.includes('authorized') || res.message.includes('Token') || res.message.includes('expired'))) {
        navigate('/login');
        return;
      }

      // Fallback: fetch live events and enquiries directly
      const [eventsRes, enquiriesRes] = await Promise.all([
        api.getPublicEvents().catch(() => ({ data: [] })),
        api.adminGetEnquiries().catch(() => ({ data: [] }))
      ]);

      const events = eventsRes?.data || [];
      const enquiries = enquiriesRes?.data || [];

      setData({
        success: true,
        stats: {
          totalEvents: events.length,
          upcomingEvents: events.length,
          completedEvents: 0,
          totalEnquiries: enquiries.length,
          pendingEnquiries: enquiries.filter(e => e.status === 'Pending').length,
          confirmedEnquiries: enquiries.filter(e => e.status === 'Confirmed').length
        },
        recentEnquiries: enquiries.slice(0, 4),
        nextEvents: events.slice(0, 3)
      });
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '3px solid var(--cream-border)',
          borderTopColor: 'var(--maroon-primary)',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Loading Cultural Dashboard...</p>
      </div>
    );
  }

  const stats = data?.stats || {
    totalEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    totalEnquiries: 0,
    pendingEnquiries: 0,
    confirmedEnquiries: 0
  };

  const recentEnquiries = (data?.recentEnquiries || []).slice(0, 4);
  const nextEvents = (data?.nextEvents || []).slice(0, 3);

  return (
    <div className="admin-dashboard-view">
      {/* 1. WELCOME HEADER (Matching Reference UI exactly) */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '14px',
        position: 'relative'
      }}>
        <div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#1F030A',
            margin: '0 0 2px',
            lineHeight: 1.15
          }}>
            Dashboard
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.88rem',
              margin: 0
            }}>
              Welcome back, Admin
            </p>
            <span style={{ color: 'var(--cream-border)', fontSize: '0.8rem' }}>•</span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--gold-dark)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              <span>CLASSICAL ARTS</span>
              <span>|</span>
              <span>RICHER LIVES</span>
            </div>
          </div>
        </div>

        {/* Date and Gopuram watermarking on right */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#FFFFFF',
            border: '1px solid var(--cream-border)',
            padding: '5px 12px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--maroon-darkest)'
          }}>
            <Calendar size={13} style={{ color: 'var(--gold-dark)' }} />
            <span>Thursday, 30 October 2026</span>
          </div>
          <div style={{
            fontSize: '0.62rem',
            color: 'rgba(100, 83, 75, 0.7)',
            letterSpacing: '0.1em',
            marginTop: '3px',
            textTransform: 'uppercase'
          }}>
            PRESERVING • PROMOTING • CELEBRATING OUR CLASSICAL HERITAGE
          </div>
        </div>
      </div>

      {/* 2. STATS CARDS (Exact match to reference mockup cards) */}
      <div className="admin-stats-grid">
        {/* Total Events */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper maroon">
            <Calendar size={20} />
          </div>
          <div>
            <div className="stat-title-label">Total Events</div>
            <div className="stat-number-display">{stats.totalEvents}</div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper gold">
            <Users size={20} />
          </div>
          <div>
            <div className="stat-title-label">Upcoming Events</div>
            <div className="stat-number-display" style={{ color: '#8F6A18' }}>
              {stats.upcomingEvents < 10 ? `0${stats.upcomingEvents}` : stats.upcomingEvents}
            </div>
          </div>
        </div>

        {/* Total Enquiries */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper green">
            <Mail size={20} />
          </div>
          <div>
            <div className="stat-title-label">Total Enquiries</div>
            <div className="stat-number-display" style={{ color: '#105930' }}>
              {stats.totalEnquiries}
            </div>
          </div>
        </div>

        {/* Pending Enquiries */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper blue">
            <Clock size={20} />
          </div>
          <div>
            <div className="stat-title-label">Pending Enquiries</div>
            <div className="stat-number-display" style={{ color: '#854D0E' }}>
              {stats.pendingEnquiries}
            </div>
          </div>
        </div>
      </div>

      {/* 3. TWO COLUMN SECTIONS: Recent Enquiries & Upcoming Events */}
      <div className="dashboard-sections-grid">
        {/* Left: Recent Enquiries Table */}
        <div className="dashboard-panel-card">
          <div className="panel-card-header">
            <div className="panel-card-title">
              <span style={{ color: 'var(--maroon-primary)' }}>📄</span>
              <span>Recent Enquiries</span>
            </div>
            <Link
              to="/admin/enquiries"
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--maroon-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none'
              }}
            >
              <span>View all</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="admin-table-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Event Type</th>
                  <th>Event Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.length > 0 ? (
                  recentEnquiries.map((enq) => (
                    <tr key={enq._id || enq.referenceId}>
                      <td style={{ fontWeight: 600, color: 'var(--maroon-darkest)' }}>
                        {enq.customerName}
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>
                        {enq.eventType}
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>
                        {enq.eventDate}
                      </td>
                      <td>
                        <span className={`status-pill ${enq.status}`}>
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)' }}>
                      No enquiries registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Upcoming Events Preview (Compacted box) */}
        <div className="dashboard-panel-card upcoming-events-card">
          <div className="panel-card-header">
            <div className="panel-card-title">
              <span style={{ color: 'var(--maroon-primary)' }}>🗓</span>
              <span>Upcoming Events</span>
            </div>
            <Link
              to="/admin/events"
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--maroon-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none'
              }}
            >
              <span>View all</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="dashboard-events-list">
            {nextEvents.length > 0 ? (
              nextEvents.map((ev) => (
                <div key={ev._id || ev.id} className="dashboard-event-item">
                  <img
                    src={ev.poster}
                    alt={ev.title}
                    className="dashboard-event-thumb"
                  />
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      color: 'var(--maroon-darkest)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {ev.title}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      marginTop: '2px'
                    }}>
                      <Calendar size={11} style={{ color: 'var(--gold-dark)' }} />
                      <span>{ev.displayDate || ev.date}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                No upcoming events scheduled.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM QUOTE STRIP (Matching Reference UI footer) */}
      <div className="admin-bottom-quote-strip">
        <div style={{ fontStyle: 'italic', fontFamily: 'Playfair Display, serif', color: 'var(--maroon-primary)', fontSize: '0.8rem' }}>
          "Through Iyal, Isai and Naadagam, we keep our culture alive."
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.68rem',
          fontWeight: 700,
          color: 'var(--gold-dark)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}>
          <div style={{ width: '28px', height: '1.5px', background: 'var(--gold-primary)' }} />
          <span>TRADITION INSPIRES TOMORROW</span>
        </div>
      </div>
    </div>
  );
}
