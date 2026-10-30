import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  X,
  MapPin,
  Tag
} from 'lucide-react';
import { api } from '../services/api';
import '../styles/admin.css';

export default function ManageGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tamilTitle: '',
    category: 'Bharatanatyam',
    location: 'Chennai, Tamil Nadu',
    description: '',
    imageUrl: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetAllGallery();
      if (res.success) {
        setItems(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((k) => data.append(k, formData[k]));
      if (file) {
        data.append('image', file);
      }

      await api.adminCreateGalleryItem(data);
      setModalOpen(false);
      setFormData({
        title: '',
        tamilTitle: '',
        category: 'Bharatanatyam',
        location: 'Chennai, Tamil Nadu',
        description: '',
        imageUrl: ''
      });
      setFile(null);
      setPreview('');
      fetchGallery();
    } catch (err) {
      alert('Error uploading photo: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this cultural photo from the gallery?')) return;
    try {
      await api.adminDeleteGalleryItem(id);
      fetchGallery();
    } catch (err) {
      alert('Error deleting photo: ' + err.message);
    }
  };

  return (
    <div className="manage-gallery-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--maroon-darkest)', margin: 0 }}>
            Manage Cultural Gallery
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0' }}>
            Upload, categorize, and curate performance photographs for the public gallery
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn-gold" style={{ padding: '11px 22px' }}>
          <Plus size={18} />
          <span>Upload Performance Photo</span>
        </button>
      </div>

      {/* Grid of gallery cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {items.map((item) => (
          <div
            key={item._id || item.id}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--cream-border)',
              overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(116, 21, 46, 0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ height: '180px', position: 'relative' }}>
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(38, 4, 12, 0.75)',
                color: '#FFE082',
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                {item.category}
              </span>
            </div>

            <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--maroon-darkest)', margin: '0 0 4px' }}>
                  {item.title}
                </h4>
                {item.tamilTitle && (
                  <div style={{ fontFamily: 'var(--font-tamil)', color: 'var(--gold-dark)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    {item.tamilTitle}
                  </div>
                )}
                {item.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <MapPin size={12} style={{ color: 'var(--gold-dark)' }} />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--cream-border)' }}>
                <button
                  onClick={() => handleDelete(item._id || item.id)}
                  style={{
                    background: '#FEE2E2',
                    border: '1px solid #FCA5A5',
                    color: '#B91C1C',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--cream-border)', paddingBottom: '14px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--maroon-darkest)', margin: 0 }}>
                Upload Cultural Photo
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Karakattam Harvest Celebration"
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                  Tamil Caption / Title
                </label>
                <input
                  type="text"
                  value={formData.tamilTitle}
                  onChange={(e) => setFormData({ ...formData, tamilTitle: e.target.value })}
                  className="form-input"
                  placeholder="e.g. மங்கல கரகாட்ட நாட்டியம்"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                    Art Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="Bharatanatyam">Bharatanatyam</option>
                    <option value="Folk Dance">Folk Dance</option>
                    <option value="Music">Music</option>
                    <option value="Drama">Drama</option>
                    <option value="Cultural Events">Cultural Events</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                    Stage Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Narada Gana Sabha"
                  />
                </div>
              </div>

              {/* Upload image */}
              <div style={{ marginBottom: '16px', background: '#FAF7F0', padding: '14px', borderRadius: '12px', border: '1px solid var(--cream-border)' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                  Upload File (or Enter Cloudinary URL)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginBottom: '8px', fontSize: '0.85rem' }}
                />
                {preview && (
                  <div style={{ marginTop: '8px' }}>
                    <img src={preview} alt="Preview" style={{ height: '80px', borderRadius: '6px' }} />
                  </div>
                )}
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, imageUrl: e.target.value });
                    setPreview(e.target.value);
                  }}
                  className="form-input"
                  placeholder="Or paste image URL (https://...)"
                  style={{ marginTop: '6px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-gold-outline" style={{ padding: '9px 18px' }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-gold" style={{ padding: '9px 24px' }}>
                  {saving ? 'Uploading...' : 'Save Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
