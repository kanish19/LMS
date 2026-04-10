import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api/api';
import LineWaves from '../components/LineWaves';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authAPI.login(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/campus');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      position: 'relative',
      background: '#0a0a0a',
      overflow: 'hidden'
    }}>
      <LineWaves 
        color1="#2e7d32" 
        color2="#4caf50" 
        color3="#1b5e20" 
        brightness={0.15} 
        speed={0.2} 
        innerLineCount={25}
        outerLineCount={30}
      />
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '40px',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Simple LMS</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginBottom: '30px' }}>
          Welcome back! Please sign in.
        </p>

        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#ffebee',
            color: 'var(--error)',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              onChange={handleChange}
              value={form.email}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              onChange={handleChange}
              value={form.password}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              marginTop: '10px',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--primary)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '700',
              boxShadow: '0 4px 6px rgba(46, 125, 50, 0.2)'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: '30px', textAlign: 'center', color: 'var(--text-dim)' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Create Account</Link>
        </p>
      </div>
    </div>
  );
}