import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Fixed: The backend route is /signup (or /admin-signup), not /register
      const endpoint = form.role === 'admin' ? '/api/auth/admin-signup' : '/api/auth/signup';
      await axios.post(`http://localhost:5000${endpoint}`, form);
      
      alert('Account created successfully! Please sign in.');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at bottom left, #1e1b4b, #020617)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Outfit', sans-serif",
      color: 'white'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '60px',
        borderRadius: '32px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '900', 
          marginBottom: '10px',
          background: 'linear-gradient(to right, #818cf8, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Join Omni
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '40px' }}>Begin your journey in the virtual campus.</p>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            style={{
              padding: '15px 20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            style={{
              padding: '15px 20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            style={{
              padding: '15px 20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          
          <select 
            name="role" 
            onChange={handleChange}
            style={{
              padding: '15px 20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1rem',
              outline: 'none'
            }}
          >
            <option value="student" style={{ background: '#020617' }}>Student</option>
            <option value="admin" style={{ background: '#020617' }}>Admin</option>
          </select>

          <button 
            type="submit"
            disabled={loading}
            style={{
              marginTop: '10px',
              padding: '16px',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.5)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            {loading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <p style={{ marginTop: '30px', color: 'rgba(255,255,255,0.6)' }}>
          Already have an account? <Link to="/" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}