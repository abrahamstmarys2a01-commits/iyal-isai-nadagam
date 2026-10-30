import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import Logo from '../components/Logo';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'admin',
    password: 'admin123'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.login(formData);
      if (res.success && res.token) {
        sessionStorage.setItem('kalamanram_admin_token', res.token);
        sessionStorage.setItem('kalamanram_admin_user', JSON.stringify(res.admin));
        localStorage.setItem('kalamanram_admin_token', res.token);
        localStorage.setItem('kalamanram_admin_user', JSON.stringify(res.admin));
        navigate('/');
      } else {
        setError(res.message || 'Invalid username or password.');
      }
    } catch (err) {
      setError('Unable to reach server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 40%, #540D1F 0%, #29040C 60%, #140206 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Mandalas */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        opacity: 0.08,
        pointerEvents: 'none'
      }}>
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#C99A35" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#C99A35" strokeWidth="1" />
        </svg>
      </div>

      <div style={{
        maxWidth: '360px',
        width: '100%',
        background: '#FFFFFF',
        borderRadius: '18px',
        padding: '26px 22px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
        border: '1.5px solid rgba(201, 154, 53, 0.4)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'inline-block', marginBottom: '8px' }}>
            <Logo size="small" showText={false} />
          </div>
          <div style={{
            fontFamily: 'var(--font-tamil)',
            color: 'var(--maroon-primary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '2px'
          }}>
            இயல் இசை நாடகக் கலைமன்றம்
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.35rem',
            color: 'var(--maroon-darkest)',
            margin: 0
          }}>
            Administrative Portal
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Cultural Coordinators & Directors Sign In
          </p>
        </div>

        {error && (
          <div style={{
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            color: '#B91C1C',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '0.80rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '14px'
          }}>
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.80rem', fontWeight: 700, color: 'var(--maroon-darkest)', marginBottom: '4px' }}>
              Username or Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-dark)' }} />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin"
                required
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--cream-border)',
                  background: 'var(--cream-bg)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.80rem', fontWeight: 700, color: 'var(--maroon-darkest)', marginBottom: '4px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-dark)' }} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--cream-border)',
                  background: 'var(--cream-bg)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{
              fontSize: '0.74rem',
              color: 'var(--text-muted)',
              marginTop: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              background: '#FAF7F0',
              padding: '5px 8px',
              borderRadius: '6px',
              border: '1px dashed var(--cream-border)'
            }}>
              <span>User: <strong style={{ color: 'var(--maroon-primary)' }}>admin</strong></span>
              <span>Pass: <strong style={{ color: 'var(--maroon-primary)' }}>admin123</strong></span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Sparkles size={14} />
                <span>Enter Admin Console</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--cream-border)' }}>
          <a
            href="https://iyal-isai-nadagam.onrender.com"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '0.78rem', color: 'var(--maroon-primary)', textDecoration: 'none', fontWeight: 600 }}
          >
            ← View Cultural Arts Site
          </a>
        </div>
      </div>
    </div>
  );
}
