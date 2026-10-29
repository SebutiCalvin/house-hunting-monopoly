import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', fullName: '', phone: '', role: 'tenant' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      toast.success(form.role === 'agent' ? 'Account created! Await admin approval.' : 'Account created!');
      navigate('/dashboard');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '40px auto', padding: '40px', background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', fontWeight: 700 }}>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontWeight: 500 }}>Full Name</label>
          <input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} className="input-modern" required />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontWeight: 500 }}>Email</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-modern" required />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontWeight: 500 }}>Phone (+266 or +27)</label>
          <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+26658123456" className="input-modern" required />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontWeight: 500 }}>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="input-modern" required minLength={6} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontWeight: 500 }}>Register as</label>
          <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="input-modern">
            <option value="tenant">Tenant / Client</option>
            <option value="agent">Agent / Landlord (needs approval)</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%' }}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '16px', color: '#6a6a72' }}>
        Already registered? <Link to="/login" style={{ color: '#ff6b4a', fontWeight: 600 }}>Sign In</Link>
      </p>
    </div>
  );
};

export default Register;
