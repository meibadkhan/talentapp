import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { apiUrl } from '../api';

const C = {
  bg: "#0B0F19",
  surface: "#121A2C",
  surfaceAlt: "#19233A",
  border: "#242F49",
  text: "#EDF1F7",
  textDim: "#8C96AC",
  violet: "#7C5CFC",
  teal: "#3ED9C5",
  amber: "#FFB454",
};

export default function LoginModal({ onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(apiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        onLogin(data.token);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16
    }} onClick={onClose}>
      <div style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: '32px 28px',
        width: '100%',
        maxWidth: 380,
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14,
          background: 'none', border: 'none', color: C.textDim, cursor: 'pointer'
        }}>
          <X size={20} />
        </button>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `${C.violet}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px'
          }}>
            <Lock size={22} color={C.violet} />
          </div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 4 }}>
            Admin Login
          </h3>
          <p style={{ color: C.textDim, fontSize: 13 }}>Enter credentials to access the dashboard</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6 }}>Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: '100%', background: C.bg, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: '12px 14px', color: C.text, fontSize: 14,
                outline: 'none'
              }}
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%', background: C.bg, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: '12px 14px', color: C.text, fontSize: 14,
                outline: 'none'
              }}
              placeholder="••••••"
              required
            />
          </div>
          {error && <p style={{ color: '#ff6b6b', fontSize: 13, textAlign: 'center' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            width: '100%', background: C.violet, color: '#fff', border: 'none',
            borderRadius: 8, padding: '13px', fontWeight: 600, fontSize: 14,
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            marginTop: 4
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
