import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Mail,
  Image,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  CheckCheck,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import '../styles/admin.css';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifRef = useRef(null);
  const userDropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [readNotifIds, setReadNotifIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kalamanram_read_enquiries') || '[]');
    } catch {
      return [];
    }
  });

  // Helper for human-readable relative time
  const getTimeAgo = (dateStr) => {
    if (!dateStr) return 'Recently';
    const created = new Date(dateStr);
    const diffMs = Date.now() - created.getTime();
    if (isNaN(diffMs) || diffMs < 0) return 'Recently';
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  // Fetch ONLY new enquiries (status: 'Pending')
  const fetchNewEnquiries = async () => {
    try {
      const res = await api.adminGetEnquiries({ status: 'Pending' });
      if (res.success && Array.isArray(res.data)) {
        const notifList = res.data.map((enq) => {
          const id = enq._id || enq.id || enq.referenceId;
          const isUnread = !readNotifIds.includes(id);
          return {
            id,
            type: 'enquiry',
            title: enq.eventType ? `New ${enq.eventType} Enquiry` : 'New Cultural Booking Enquiry',
            tamilTitle: 'புதிய கலைக்குழு விசாரணைக் கோரிக்கை',
            desc: `${enq.customerName || 'Customer'} requested ${enq.eventType || 'performance'} (${enq.phone || 'Phone not provided'}).`,
            time: getTimeAgo(enq.createdAt),
            unread: isUnread,
            link: '/enquiries'
          };
        });
        setNotifications(notifList);
      }
    } catch (err) {
      console.warn('[AdminLayout] Failed to load enquiry notifications:', err);
    }
  };

  useEffect(() => {
    fetchNewEnquiries();
    const interval = setInterval(fetchNewEnquiries, 20000); // Check every 20s for new enquiries
    return () => clearInterval(interval);
  }, [readNotifIds]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const adminUser = JSON.parse(
    sessionStorage.getItem('kalamanram_admin_user') ||
    localStorage.getItem('kalamanram_admin_user') ||
    '{"name":"Admin"}'
  );

  useEffect(() => {
    setSidebarOpen(false);
    setDropdownOpen(false);
    setNotificationsOpen(false);
  }, [location.pathname]);

  // Handle clicking outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = (e) => {
    e.stopPropagation();
    const allIds = notifications.map(n => n.id);
    const updated = Array.from(new Set([...readNotifIds, ...allIds]));
    setReadNotifIds(updated);
    try {
      localStorage.setItem('kalamanram_read_enquiries', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (notif) => {
    const updated = Array.from(new Set([...readNotifIds, notif.id]));
    setReadNotifIds(updated);
    try {
      localStorage.setItem('kalamanram_read_enquiries', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
    setNotificationsOpen(false);
    navigate(notif.link);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kalamanram_admin_token');
    sessionStorage.removeItem('kalamanram_admin_user');
    localStorage.removeItem('kalamanram_admin_token');
    localStorage.removeItem('kalamanram_admin_user');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Manage Events', path: '/events', icon: Calendar },
    { name: 'Manage Enquiries', path: '/enquiries', icon: Mail },
    { name: 'Manage Gallery', path: '/gallery', icon: Image },
    { name: 'Contact Settings', path: '/settings', icon: Settings }
  ];

  return (
    <div className="admin-layout">
      {/* Mobile Sidebar Backdrop Overlay */}
      <div
        className={`admin-sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* 1. SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button
          className="admin-sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close Navigation Menu"
        >
          <X size={18} />
        </button>

        <div className="admin-sidebar-header">
          {/* Traditional Temple Gopuram & Veena Medallion */}
          <div className="sidebar-emblem">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <defs>
                <linearGradient id="sidebarGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FFE082" />
                  <stop offset="50%" stop-color="#C99A35" />
                  <stop offset="100%" stop-color="#8C6514" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="46" fill="none" stroke="url(#sidebarGold)" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M 50,15 L 75,55 L 68,55 L 72,70 L 28,70 L 32,55 L 25,55 Z" fill="none" stroke="url(#sidebarGold)" strokeWidth="1.5" />
              <circle cx="50" cy="40" r="6" fill="none" stroke="url(#sidebarGold)" strokeWidth="1.2" />
              <path d="M 40,78 Q 50,84 60,78" fill="none" stroke="url(#sidebarGold)" strokeWidth="2" />
              {/* Classical Nataraja Mudra Silhouette */}
              <circle cx="50" cy="52" r="3.5" fill="#FFE082" />
              <path d="M 48,56 L 46,65 L 54,65 L 52,56 Z" fill="url(#sidebarGold)" />
            </svg>
          </div>

          <div className="sidebar-org-title">
            Iyal Isai Naadaga
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
            Kalamanram
          </div>
          <div className="sidebar-org-sub">
            இயல் இசை நாடகக் கலைமன்றம்
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            className="sidebar-link"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              marginTop: 'auto',
              color: '#FCA5A5'
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>

        {/* Traditional Footer in Sidebar */}
        <div className="sidebar-footer">
          <div style={{ color: 'var(--gold-light)', fontSize: '0.8rem', marginBottom: '4px' }}>
            ✦ ✦ ✦
          </div>
          <div className="sidebar-quote">
            ARTS • HERITAGE • PEOPLE<br />A BRIGHTER TOMORROW
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="admin-main">
        {/* Top Header Bar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <Menu size={20} />
            </button>
            <div className="topbar-mobile-brand">
              <span>கலைமன்றம்</span>
            </div>
            <div className="topbar-search-box">
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search events, enquiries, or anything..."
              />
            </div>
          </div>

          <div className="topbar-right">
            {/* Notification Bell Center */}
            <div style={{ position: 'relative' }} ref={notifRef}>
              <button
                type="button"
                className="topbar-notification"
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setDropdownOpen(false);
                }}
                title={unreadCount > 0 ? `${unreadCount} New Notifications` : 'Notifications'}
                aria-label="Toggle notifications dropdown"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="topbar-badge">{unreadCount}</span>
                )}
              </button>

              {notificationsOpen && (
                <div className="notifications-dropdown">
                  <div className="notif-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#FFFFFF' }}>
                        புதிய விசாரணைகள் (New Enquiries)
                      </span>
                      {unreadCount > 0 && (
                        <span className="notif-count-pill">{unreadCount} New</span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="notif-mark-read-btn"
                        title="Mark all as read"
                      >
                        <CheckCheck size={13} />
                        <span>Mark all read</span>
                      </button>
                    )}
                  </div>

                  <div className="notif-list">
                    {notifications.length > 0 ? (
                      notifications.map((item) => (
                        <div
                          key={item.id}
                          className={`notif-item ${item.unread ? 'unread' : ''}`}
                          onClick={() => handleNotificationClick(item)}
                        >
                          <div className="notif-icon-circle notif-enquiry">
                            <Mail size={16} />
                          </div>
                          <div className="notif-content">
                            <div className="notif-title-row">
                              <span className="notif-title">{item.title}</span>
                              <span className="notif-time">{item.time}</span>
                            </div>
                            <div className="notif-tamil-sub">{item.tamilTitle}</div>
                            <p className="notif-desc">{item.desc}</p>
                          </div>
                          {item.unread && <span className="notif-unread-dot" />}
                        </div>
                      ))
                    ) : (
                      <div className="notif-empty" style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Mail size={32} style={{ opacity: 0.35, marginBottom: '8px', color: 'var(--maroon-primary)' }} />
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--maroon-darkest)' }}>
                          No New Enquiries
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          புதிய விசாரணைக் கோரிக்கைகள் எதுவும் இல்லை
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="notif-footer">
                    <Link
                      to="/enquiries"
                      onClick={() => setNotificationsOpen(false)}
                      className="notif-footer-link"
                    >
                      <span>View All Enquiries</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }} ref={userDropdownRef}>
              <div
                className="admin-user-pill"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setNotificationsOpen(false);
                }}
              >
                <div className="admin-avatar-circle">
                  <User size={16} />
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--maroon-darkest)' }}>
                  {adminUser.name || 'Admin'}
                </span>
                <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
              </div>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '46px',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  border: '1px solid var(--cream-border)',
                  width: '180px',
                  padding: '8px',
                  zIndex: 200
                }}>
                  <a
                    href="http://localhost:5174"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.85rem',
                      color: 'var(--text-dark)',
                      textDecoration: 'none',
                      borderRadius: '8px'
                    }}
                  >
                    <span>View Public Site</span>
                  </a>

                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.85rem',
                      color: '#D32F2F',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Views Container */}
        <main className="admin-page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
