import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiHeart, FiCalendar, FiSearch, FiHome } from 'react-icons/fi';

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>My <span style={{ color: '#ff6b4a' }}>Dashboard</span></h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <Link to="/properties" style={{ background: 'white', padding: '24px', borderRadius: '16px', textAlign: 'center', textDecoration: 'none', color: '#1e1e2a', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <FiSearch size={32} color="#ff6b4a" />
          <div style={{ fontWeight: 600, marginTop: '8px' }}>Browse Properties</div>
        </Link>
        <Link to="/appointments" style={{ background: 'white', padding: '24px', borderRadius: '16px', textAlign: 'center', textDecoration: 'none', color: '#1e1e2a', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <FiCalendar size={32} color="#ff9500" />
          <div style={{ fontWeight: 600, marginTop: '8px' }}>My Appointments ({appointments.length})</div>
        </Link>
      </div>

      {appointments.length > 0 && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Upcoming Appointments</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {appointments.map(a => (
              <div key={a._id} style={{ padding: '12px', background: '#f7fafc', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <strong>{a.propertyId?.title}</strong>
                  <p style={{ fontSize: '13px', color: '#6a6a72' }}>{new Date(a.appointmentDate).toLocaleDateString()} at {a.startTime}</p>
                </div>
                <span style={{ fontSize: '12px', padding: '4px 12px', background: '#e2e8f0', borderRadius: '50px' }}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
