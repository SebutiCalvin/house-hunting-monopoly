import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FiHome, FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '40px auto', padding: '40px', background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <FiHome size={48} color="#ff6b4a" />
        <h2 style={{ marginTop: '8px', fontWeight: 700 }}>Welcome Back</h2>
        <p style={{ color: '#6a6a72' }}>Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: 500 }}><FiMail /> Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-modern" required />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: 500 }}><FiLock /> Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-modern" required />
        </div>
        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%' }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '16px', color: '#6a6a72' }}>
        No account? <Link to="/register" style={{ color: '#ff6b4a', fontWeight: 600 }}>Register</Link>
      </p>
    </div>
  );
};

export default Login;
