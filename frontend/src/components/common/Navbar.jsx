import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiLogOut, FiUser, FiSpeaker } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdminOrAgent = user && (user.role === 'admin' || user.role === 'agent');

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '12px 24px', background: 'rgba(10,10,20,0.85)',
      backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <FiHome size={24} color="#ff6b4a" />
        <span style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>
          House <span style={{ color: '#ff6b4a' }}>Hunting</span>
        </span>
        <span style={{ fontSize: '9px', background: 'rgba(255,107,74,0.15)', color: '#ff6b4a', padding: '2px 8px', borderRadius: '20px' }}>MONOPOLY</span>
      </Link>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
        <Link to="/properties" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Properties</Link>
        <Link to="/categories" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Categories</Link>
        {user && <Link to="/dashboard" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Dashboard</Link>}
        {isAdminOrAgent && (
          <Link to="/advertise" style={{
            background: '#ff6b4a', color: 'white', padding: '6px 14px',
            borderRadius: '50px', textDecoration: 'none', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '4px'
          }}>
            <FiSpeaker size={14} /> Advertise
          </Link>
        )}
        {user ? (
          <>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FiUser />{user.fullName} ({user.role})
            </span>
            <button onClick={logout} style={{
              background: 'rgba(255,107,74,0.15)', color: '#ff6b4a',
              border: '1px solid rgba(255,107,74,0.2)', padding: '6px 14px',
              borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
            }}><FiLogOut size={14} />Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} style={{
              background: 'rgba(255,255,255,0.06)', color: 'white',
              border: '1px solid rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '50px', cursor: 'pointer'
            }}>Login</button>
            <button onClick={() => navigate('/register')} style={{
              background: '#ff6b4a', color: 'white', border: 'none',
              padding: '6px 16px', borderRadius: '50px', cursor: 'pointer', fontWeight: 600
            }}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
