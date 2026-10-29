import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPhone, FiMail, FiMapPin, FiHeart } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer style={{ background: 'white', borderTop: '1px solid #e2e8f0', padding: '48px 24px 24px', marginTop: 'auto' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
      <div>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 800 }}>
          <FiHome size={22} color="#ff6b4a" /> House <span style={{ color: '#ff6b4a' }}>Hunting</span>
        </h3>
        <p style={{ color: '#6a6a72', fontSize: '14px', marginTop: '12px' }}>Lesotho's Premier Property Platform</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
            <a key={i} href="#" style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(255,107,74,0.08)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: '#ff6b4a'
            }}><Icon size={16} /></a>
          ))}
        </div>
      </div>
      <div>
        <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>Quick Links</h4>
        {['Home', 'Properties', 'Categories', 'Advertise'].map(item => (
          <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} style={{ display: 'block', color: '#6a6a72', textDecoration: 'none', marginBottom: '8px', fontSize: '14px' }}>{item}</Link>
        ))}
      </div>
      <div>
        <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>Contact</h4>
        <p style={{ display: 'flex', gap: '8px', color: '#6a6a72', fontSize: '14px' }}><FiPhone /> +266 5726 6136</p>
        <p style={{ display: 'flex', gap: '8px', color: '#6a6a72', fontSize: '14px', marginTop: '8px' }}><FiMail /> sebuticalvinmofokeng@gmail.com</p>
        <p style={{ display: 'flex', gap: '8px', color: '#6a6a72', fontSize: '14px', marginTop: '8px' }}><FiMapPin /> Maseru, Lesotho</p>
      </div>
    </div>
    <div style={{ textAlign: 'center', color: '#9a9aa2', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e2e8f0', fontSize: '13px' }}>
      © {new Date().getFullYear()} House Hunting Monopoly · Made with <FiHeart size={12} color="#ff6b4a" /> in Lesotho
    </div>
  </footer>
);

export default Footer;
