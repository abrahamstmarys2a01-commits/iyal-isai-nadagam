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
        recentEnquiries: enquiries.slice(0, 5),
        nextEvents: events.slice(0, 4)
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

  const recentEnquiries = data?.recentEnquiries || [];
  const nextEvents = data?.nextEvents || [];

  return (
    <div className="admin-dashboard-view">
      {/* 1. WELCOME HEADER (Matching Reference UI exactly) */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '28px',
        position: 'relative'
      }}>
        <div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.6rem',
            fontWeight: 800,
            color: '#1F030A',
            margin: '0 0 4px',
            lineHeight: 1.15
          }}>
            Dashboard
          </h1>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            margin: '0 0 10px'
          }}>
            Welcome back, Admin
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--gold-dark)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase'
          }}>
            <span>CLASSICAL ARTS</span>
            <span>|</span>
            <span>RICHER LIVES</span>
          </div>
        </div>

        {/* Date and Gopuram watermarking on right */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF',
            border: '1px solid var(--cream-border)',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.86rem',
            fontWeight: 600,
            color: 'var(--maroon-darkest)'
          }}>
            <Calendar size={15} style={{ color: 'var(--gold-dark)' }} />
            <span>Thursday, 30 October 2026</span>
          </div>
          <div style={{
            fontSize: '0.68rem',
            color: 'rgba(100, 83, 75, 0.7)',
            letterSpacing: '0.12em',
            marginTop: '8px',
            textTransform: 'uppercase'
          }}>
            PRESERVING • PROMOTING • CELEBRATING<br />OUR CLASSICAL HERITAGE
          </div>
        </div>
      </div>

      {/* 2. STATS CARDS (Exact match to reference mockup cards) */}
      <div className="admin-stats-grid">
        {/* Total Events */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper maroon">
            <Calendar size={26} />
          </div>
          <div>
            <div className="stat-title-label">Total Events</div>
            <div className="stat-number-display">{stats.totalEvents}</div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper gold">
            <Users size={26} />
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
            <Mail size={26} />
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
            <Clock size={26} />
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
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--maroon-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none'
              }}
            >
              <span>View all</span>
              <ArrowRight size={14} />
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
                    <td colSpan="4" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                      No enquiries registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Upcoming Events Preview */}
        <div className="dashboard-panel-card">
          <div className="panel-card-header">
            <div className="panel-card-title">
              <span style={{ color: 'var(--maroon-primary)' }}>🗓</span>
              <span>Upcoming Events</span>
            </div>
            <Link
              to="/admin/events"
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--maroon-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none'
              }}
            >
              <span>View all</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                      fontSize: '0.94rem',
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
                      gap: '6px',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      marginTop: '2px'
                    }}>
                      <Calendar size={12} style={{ color: 'var(--gold-dark)' }} />
                      <span>{ev.displayDate || ev.date}</span>
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: 'var(--gold-dark)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginTop: '2px'
                    }}>
                      {ev.shortDesc?.slice(0, 32)}...
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                No upcoming events scheduled.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM QUOTE STRIP (Matching Reference UI footer) */}
      <div className="admin-bottom-quote-strip">
        <div style={{ fontStyle: 'italic', fontFamily: 'Playfair Display, serif', color: 'var(--maroon-primary)' }}>
          "Through Iyal, Isai and Naadagam, we keep our culture alive."
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--gold-dark)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}>
          <div style={{ width: '36px', height: '1.5px', background: 'var(--gold-primary)' }} />
          <span>TRADITION INSPIRES TOMORROW</span>
        </div>
      </div>
    </div>
  );
}
