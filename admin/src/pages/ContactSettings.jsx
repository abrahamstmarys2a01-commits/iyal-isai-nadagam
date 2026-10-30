import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { api } from '../services/api';
import '../styles/admin.css';

export default function ContactSettings() {
  const [settings, setSettings] = useState({
    orgName: 'Iyal Isai Naadaga Kalamanram',
    orgTamilName: 'இயல் இசை நாடகக் கலைமன்றம்',
    phone: '+91 98765 43210',
    alternatePhone: '+91 94440 12345',
    email: 'contact@iyalisainaadagam.org',
    address: 'Muthamizh Valagam, Heritage Arts Corridor, TTK Road & Santhome High Road, Chennai 600 004, Tamil Nadu, India',
    whatsapp: '+919876543210',
    officeHours: 'Mon – Sat: 9:00 AM – 7:30 PM IST'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.success && res.data) {
          setSettings(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await api.adminUpdateSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Error updating settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="contact-settings-view">
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--maroon-darkest)', margin: 0 }}>
          Organization & Contact Settings
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0' }}>
          Update central cultural office details, phone lines, email addresses, and WhatsApp coordinates
        </p>
      </div>

      <div className="dashboard-panel-card" style={{ maxWidth: '780px' }}>
        {success && (
          <div style={{
            background: '#D1FAE5',
            border: '1px solid #6EE7B7',
            color: '#065F46',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600
          }}>
            <CheckCircle2 size={18} />
            <span>Settings updated and reflected across public website!</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                Organization Name (English)
              </label>
              <input
                type="text"
                name="orgName"
                value={settings.orgName}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                Organization Name (Tamil)
              </label>
              <input
                type="text"
                name="orgTamilName"
                value={settings.orgTamilName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                Primary Phone Line
              </label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                Alternate Phone Line
              </label>
              <input
                type="text"
                name="alternatePhone"
                value={settings.alternatePhone}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                Official Email
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                WhatsApp Number
              </label>
              <input
                type="text"
                name="whatsapp"
                value={settings.whatsapp}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              Campus / Office Address
            </label>
            <textarea
              name="address"
              rows="3"
              value={settings.address}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              Office & Rehearsal Hours
            </label>
            <input
              type="text"
              name="officeHours"
              value={settings.officeHours}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={saving}
              className="btn-gold"
              style={{ padding: '12px 28px', fontSize: '0.92rem' }}
            >
              <Save size={16} />
              <span>{saving ? 'Updating...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
