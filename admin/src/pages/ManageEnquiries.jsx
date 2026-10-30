import React, { useState, useEffect } from 'react';
import {
  Mail,
  Search,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Phone,
  Calendar,
  MapPin,
  X,
  Filter,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import '../styles/admin.css';

export default function ManageEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetEnquiries({
        status: statusFilter,
        search
      });
      if (res.success) {
        setEnquiries(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleOpenDetails = (enq) => {
    setSelectedEnquiry(enq);
    setAdminNotes(enq.adminNotes || '');
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setStatusUpdating(true);
      await api.adminUpdateEnquiryStatus(id, newStatus, adminNotes);
      if (selectedEnquiry && (selectedEnquiry._id === id || selectedEnquiry.id === id)) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus, adminNotes });
      }
      fetchEnquiries();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      await api.adminDeleteEnquiry(id);
      if (selectedEnquiry && (selectedEnquiry._id === id || selectedEnquiry.id === id)) {
        setSelectedEnquiry(null);
      }
      fetchEnquiries();
    } catch (err) {
      alert('Error deleting enquiry: ' + err.message);
    }
  };

  return (
    <div className="manage-enquiries-view">
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--maroon-darkest)', margin: 0 }}>
          Manage Customer Enquiries
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0' }}>
          Review booking requests, track follow-ups, and update troupe confirmation status
        </p>
      </div>

      {/* Search & Status Filters */}
      <div className="dashboard-panel-card" style={{ padding: '18px 24px', marginBottom: '24px' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1, maxWidth: '420px', background: '#FAF7F0', border: '1px solid var(--cream-border)', borderRadius: '999px', padding: '8px 16px' }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by customer name, phone, or reference ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.88rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'Pending', 'Contacted', 'Confirmed', 'Rejected'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`filter-btn ${statusFilter === st ? 'active' : ''}`}
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              >
                {st}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="dashboard-panel-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Ref ID</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Event Type</th>
                <th>Event Date & Venue</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length > 0 ? (
                enquiries.map((enq) => (
                  <tr key={enq._id || enq.referenceId}>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--maroon-primary)', fontSize: '0.84rem' }}>
                        {enq.referenceId}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--maroon-darkest)' }}>
                      {enq.customerName}
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{enq.phone}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{enq.email}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--gold-dark)' }}>
                        {enq.eventType}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{enq.eventDate}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{enq.venue}</div>
                    </td>
                    <td>
                      <span className={`status-pill ${enq.status}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => handleOpenDetails(enq)}
                          title="View Details"
                          style={{
                            background: '#FAF7F0',
                            border: '1px solid var(--cream-border)',
                            color: 'var(--maroon-primary)',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(enq._id || enq.id)}
                          title="Delete Enquiry"
                          style={{
                            background: '#FEE2E2',
                            border: '1px solid #FCA5A5',
                            color: '#B91C1C',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--cream-border)', paddingBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', fontWeight: 700 }}>
                  REF: {selectedEnquiry.referenceId}
                </span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--maroon-darkest)', margin: 0 }}>
                  Enquiry Details
                </h3>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px', fontSize: '0.88rem' }}>
              <div style={{ background: '#FAF7F0', padding: '12px', borderRadius: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Customer</span>
                <strong>{selectedEnquiry.customerName}</strong>
              </div>
              <div style={{ background: '#FAF7F0', padding: '12px', borderRadius: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Phone</span>
                <strong>{selectedEnquiry.phone}</strong>
              </div>
              <div style={{ background: '#FAF7F0', padding: '12px', borderRadius: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Email</span>
                <strong>{selectedEnquiry.email}</strong>
              </div>
              <div style={{ background: '#FAF7F0', padding: '12px', borderRadius: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Event Type</span>
                <strong>{selectedEnquiry.eventType}</strong>
              </div>
              <div style={{ background: '#FAF7F0', padding: '12px', borderRadius: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Event Date</span>
                <strong>{selectedEnquiry.eventDate}</strong>
              </div>
              <div style={{ background: '#FAF7F0', padding: '12px', borderRadius: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Venue</span>
                <strong>{selectedEnquiry.venue}</strong>
              </div>
              <div style={{ gridColumn: 'span 2', background: '#FAF7F0', padding: '12px', borderRadius: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Performance Count</span>
                <strong>{selectedEnquiry.performanceCount}</strong>
              </div>
            </div>

            {selectedEnquiry.message && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--maroon-darkest)', display: 'block', marginBottom: '6px' }}>
                  Customer Message / Requirements:
                </label>
                <div style={{ background: 'var(--cream-bg)', borderLeft: '3px solid var(--gold-primary)', padding: '12px', borderRadius: '0 8px 8px 0', fontSize: '0.88rem', fontStyle: 'italic' }}>
                  "{selectedEnquiry.message}"
                </div>
              </div>
            )}

            {/* Status Update Actions */}
            <div style={{ borderTop: '1px solid var(--cream-border)', paddingTop: '18px', marginBottom: '18px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                Update Current Status:
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Pending', 'Contacted', 'Confirmed', 'Rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedEnquiry._id || selectedEnquiry.id, st)}
                    disabled={statusUpdating}
                    className={`status-pill ${st}`}
                    style={{
                      cursor: 'pointer',
                      border: selectedEnquiry.status === st ? '2px solid var(--maroon-primary)' : '1px solid rgba(0,0,0,0.1)',
                      opacity: selectedEnquiry.status === st ? 1 : 0.65,
                      transform: selectedEnquiry.status === st ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    {selectedEnquiry.status === st && <Check size={12} />}
                    <span>{st}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a
                href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, '')}?text=Vanakkam%20${encodeURIComponent(selectedEnquiry.customerName)},%20regarding%20your%20cultural%20performance%20enquiry%20with%20Iyal%20Isai%20Naadaga%20Kalamanram%20(Ref:%20${selectedEnquiry.referenceId})...`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
                style={{ padding: '9px 18px', fontSize: '0.85rem' }}
              >
                <span>WhatsApp Customer</span>
              </a>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="btn-gold-outline"
                style={{ padding: '9px 18px', fontSize: '0.85rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
