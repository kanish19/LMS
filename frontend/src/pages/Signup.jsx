import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api/api';
import LineWaves from '../components/LineWaves';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (form.role === 'admin') {
        await authAPI.adminSignup(form);
      } else {
        await authAPI.signup(form);
      }
      alert('Account created successfully! You can now log in.');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
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
        maxWidth: '450px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Join SimpleLMS</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginBottom: '30px' }}>
          Create your account to start learning.
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

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              required
              onChange={handleChange}
              value={form.name}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              onChange={handleChange}
              value={form.email}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>I am a...</label>
            <select name="role" onChange={handleChange} value={form.role}>
              <option value="student">Student</option>
              <option value="admin">Teacher / Admin</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              marginTop: '15px',
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '30px', textAlign: 'center', color: 'var(--text-dim)' }}>
          Already have an account? <Link to="/" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}