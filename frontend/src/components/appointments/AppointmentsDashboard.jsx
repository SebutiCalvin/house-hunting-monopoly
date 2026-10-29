import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const AppointmentsDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAppointments(); }, []);

  const fetchAppointments = async () => {
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
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>My Appointments</h1>
      {appointments.length === 0 ? (
        <div style={{ background: 'white', padding: '60px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px' }}>📅</div>
          <p style={{ color: '#6a6a72' }}>No appointments scheduled</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {appointments.map(app => (
            <div key={app._id} style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontWeight: 700 }}>{app.propertyId?.title || 'Property'}</h3>
                  <p style={{ color: '#6a6a72', fontSize: '14px' }}>
                    📅 {format(new Date(app.appointmentDate), 'PPP')} at {app.startTime}
                  </p>
                </div>
                <span style={{
                  padding: '4px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 600,
                  background: app.status === 'confirmed' ? '#c6f6d5' : app.status === 'cancelled' ? '#fed7d7' : '#fefcbf',
                  color: app.status === 'confirmed' ? '#22543d' : app.status === 'cancelled' ? '#742a2a' : '#744210',
                }}>{app.status?.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsDashboard;
