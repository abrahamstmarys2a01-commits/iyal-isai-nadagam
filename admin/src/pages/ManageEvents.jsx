import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Upload,
  Sparkles,
  MapPin,
  Clock,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import '../styles/admin.css';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form states
  const initialForm = {
    title: '',
    tamilTitle: '',
    date: '',
    time: '06:00 PM - 09:00 PM IST',
    venue: '',
    category: 'Bharatanatyam',
    shortDesc: '',
    fullDesc: '',
    posterUrl: '',
    troupe: 'Iyal Isai Naadaga Repertory Dance Troupe',
    artForm: 'Classical Arts',
    entry: 'Open to All / Reserved Seating',
    isPublished: true,
    featured: false
  };

  const [formData, setFormData] = useState(initialForm);
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetAllEvents();
      if (res.success) {
        setEvents(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setFormData(initialForm);
    setPosterFile(null);
    setPosterPreview('');
    setModalOpen(true);
  };

  const handleOpenEdit = (ev) => {
    setEditingEvent(ev);
    setFormData({
      title: ev.title || '',
      tamilTitle: ev.tamilTitle || '',
      date: ev.date || '',
      time: ev.time || '',
      venue: ev.venue || '',
      category: ev.category || 'Bharatanatyam',
      shortDesc: ev.shortDesc || '',
      fullDesc: ev.fullDesc || '',
      posterUrl: ev.poster || '',
      troupe: ev.troupe || '',
      artForm: ev.artForm || '',
      entry: ev.entry || '',
      isPublished: ev.isPublished !== undefined ? ev.isPublished : true,
      featured: ev.featured || false
    });
    setPosterFile(null);
    setPosterPreview(ev.poster || '');
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterFile(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (posterFile) {
        data.append('poster', posterFile);
      }

      if (editingEvent) {
        await api.adminUpdateEvent(editingEvent._id || editingEvent.id, data);
      } else {
        await api.adminCreateEvent(data);
      }

      setModalOpen(false);
      fetchEvents();
    } catch (err) {
      alert('Error saving event: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.adminDeleteEvent(id);
      setDeleteConfirmId(null);
      fetchEvents();
    } catch (err) {
      alert('Failed to delete event: ' + err.message);
    }
  };

  const filteredEvents = events.filter((ev) => {
    if (statusFilter === 'Published' && !ev.isPublished) return false;
    if (statusFilter === 'Draft' && ev.isPublished) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        (ev.title && ev.title.toLowerCase().includes(s)) ||
        (ev.venue && ev.venue.toLowerCase().includes(s)) ||
        (ev.category && ev.category.toLowerCase().includes(s))
      );
    }
    return true;
  });

  return (
    <div className="manage-events-view">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--maroon-darkest)', margin: 0 }}>
            Manage Cultural Events
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0' }}>
            Publish, update, and manage stage ballets, Carnatic katcheris, and folk festivals
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-gold" style={{ padding: '11px 22px' }}>
          <Plus size={18} />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="dashboard-panel-card" style={{ padding: '18px 24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1, maxWidth: '400px', background: '#FAF7F0', border: '1px solid var(--cream-border)', borderRadius: '999px', padding: '8px 16px' }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by event title, venue, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.88rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Published', 'Draft'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`filter-btn ${statusFilter === st ? 'active' : ''}`}
                style={{ padding: '6px 16px', fontSize: '0.82rem' }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="dashboard-panel-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Poster</th>
                <th>Title & Category</th>
                <th>Date & Time</th>
                <th>Venue</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((ev) => (
                  <tr key={ev._id || ev.id}>
                    <td style={{ width: '80px' }}>
                      <img
                        src={ev.poster}
                        alt={ev.title}
                        style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--maroon-darkest)', fontSize: '0.94rem' }}>
                        {ev.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--gold-dark)', fontWeight: 600 }}>
                        {ev.category}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{ev.displayDate || ev.date}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ev.time}</div>
                    </td>
                    <td style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: '200px' }}>
                      {ev.venue}
                    </td>
                    <td>
                      <span className={`status-pill ${ev.isPublished ? 'Confirmed' : 'Pending'}`}>
                        {ev.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => handleOpenEdit(ev)}
                          title="Edit Event"
                          style={{
                            background: '#FAF7F0',
                            border: '1px solid var(--cream-border)',
                            color: 'var(--maroon-primary)',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(ev._id || ev.id)}
                          title="Delete Event"
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
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No events matching your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FEE2E2', color: '#B91C1C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <AlertCircle size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--maroon-darkest)', marginBottom: '8px' }}>
              Delete Event?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Are you sure you want to permanently remove this cultural event from the database?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirmId(null)} className="btn-gold-outline" style={{ padding: '9px 18px' }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="btn-maroon" style={{ background: '#B91C1C', padding: '9px 22px' }}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Event Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--cream-border)', paddingBottom: '14px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--maroon-darkest)', margin: 0 }}>
                {editingEvent ? 'Edit Cultural Event' : 'Add New Cultural Event'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Naadha Sangamam"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                    Tamil Title
                  </label>
                  <input
                    type="text"
                    value={formData.tamilTitle}
                    onChange={(e) => setFormData({ ...formData, tamilTitle: e.target.value })}
                    className="form-input"
                    placeholder="e.g. நாத சங்கமம்"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                    Time Slot
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="form-input"
                    placeholder="06:00 PM - 09:00 PM"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="Bharatanatyam">Bharatanatyam</option>
                    <option value="Carnatic Music">Carnatic Music</option>
                    <option value="Folk Dance">Folk Dance</option>
                    <option value="Drama">Drama</option>
                    <option value="Cultural Events">Cultural Events</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                  Venue & City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Narada Gana Sabha, Chennai"
                />
              </div>

              {/* Poster Upload / Cloudinary */}
              <div style={{ marginBottom: '16px', background: '#FAF7F0', padding: '16px', borderRadius: '12px', border: '1px solid var(--cream-border)' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                  Event Poster (Cloudinary / File Upload)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginBottom: '10px', fontSize: '0.85rem' }}
                />
                {posterPreview && (
                  <div style={{ marginTop: '8px' }}>
                    <img
                      src={posterPreview}
                      alt="Preview"
                      style={{ height: '90px', borderRadius: '8px', border: '1px solid var(--cream-border)' }}
                    />
                  </div>
                )}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Or enter image URL:
                </div>
                <input
                  type="url"
                  value={formData.posterUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, posterUrl: e.target.value });
                    setPosterPreview(e.target.value);
                  }}
                  className="form-input"
                  placeholder="https://images.unsplash.com/..."
                  style={{ marginTop: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                  Short Synopsis *
                </label>
                <textarea
                  rows="2"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                  Full Description & Performance Details
                </label>
                <textarea
                  rows="3"
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  />
                  <span>Published (Visible on Public Website)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <span>Featured Event</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-gold-outline" style={{ padding: '10px 20px' }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-gold" style={{ padding: '10px 26px' }}>
                  {saving ? 'Saving to Database...' : editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
