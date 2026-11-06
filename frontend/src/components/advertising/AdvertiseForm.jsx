import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiMail, FiHome, FiMessageCircle, FiSend } from 'react-icons/fi';

const AdvertiseForm = () => {
  const [form, setForm] = useState({ landlordName: '', landlordPhone: '', landlordEmail: '', propertyDetails: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://house-hunting-monopoly.onrender.com/api/advertising/submit', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Request submitted! We will contact you.');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.04)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <FiHome size={48} color="#ff6b4a" />
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginTop: '8px' }}>Advertise Your Property</h1>
          <p style={{ color: '#6a6a72', marginTop: '4px' }}>Reach thousands of potential tenants in Lesotho</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, marginBottom: '6px' }}><FiUser /> Your Full Name</label>
              <input name="landlordName" value={form.landlordName} onChange={handleChange} className="input-modern" required />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, marginBottom: '6px' }}><FiPhone /> Phone Number</label>
              <input name="landlordPhone" value={form.landlordPhone} onChange={handleChange} className="input-modern" placeholder="+266XXXXXXXXX" required />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, marginBottom: '6px' }}><FiMail /> Email (Optional)</label>
              <input name="landlordEmail" value={form.landlordEmail} onChange={handleChange} className="input-modern" />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, marginBottom: '6px' }}><FiHome /> Property Details</label>
              <textarea name="propertyDetails" value={form.propertyDetails} onChange={handleChange} rows="5" className="input-modern" placeholder="Address, bedrooms, price, features..." required />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, marginBottom: '6px' }}><FiMessageCircle /> Additional Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows="3" className="input-modern" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FiSend /> {loading ? 'Submitting...' : 'Submit Request'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#9a9aa2' }}>Contact: +26657266136</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvertiseForm;
