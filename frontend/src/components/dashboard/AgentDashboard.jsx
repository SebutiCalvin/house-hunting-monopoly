import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiPlus, FiEdit2, FiTrash2, FiEye, FiClock } from 'react-icons/fi';

const AgentDashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const isApproved = user?.isApproved === true;

  useEffect(() => {
    if (isApproved) fetchData();
    else setLoading(false);
  }, [isApproved]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const [propsRes, apptsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/properties/agent', { headers }),
        axios.get('http://localhost:5000/api/appointments/agent', { headers }),
      ]);
      setProperties(propsRes.data.properties || []);
      setAppointments(apptsRes.data.appointments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm('Delete?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/properties/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (err) { console.error(err); }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;

  if (!isApproved) {
    return (
      <div style={{ maxWidth: '500px', margin: '60px auto', padding: '48px 32px', background: 'white', borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,107,74,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <FiClock size={40} color="#ff6b4a" />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Account Pending Approval</h2>
        <p style={{ color: '#6a6a72', marginBottom: '16px' }}>Your agent account is waiting for admin approval.</p>
        <p style={{ color: '#9a9aa2', fontSize: '14px' }}>📱 Contact: +26657266136</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700 }}>Agent <span style={{ color: '#ff6b4a' }}>Dashboard</span></h1>
        <Link to="/add-property" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiPlus /> Add Property</Link>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>My Properties ({properties.length})</h3>
        {properties.length === 0 ? <p style={{ color: '#6a6a72' }}>No properties yet.</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '13px', color: '#6a6a72' }}>Title</th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '13px', color: '#6a6a72' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '13px', color: '#6a6a72' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '13px', color: '#6a6a72' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(p => (
                <tr key={p._id} style={{ borderBottom: '1px solid #f0f0f5' }}>
                  <td style={{ padding: '10px' }}>{p.title}</td>
                  <td style={{ padding: '10px' }}>M {p.price}</td>
                  <td style={{ padding: '10px' }}>{p.status}</td>
                  <td style={{ padding: '10px' }}>
                    <Link to={`/edit-property/${p._id}`} style={{ marginRight: '8px', color: '#ff9500' }}><FiEdit2 /></Link>
                    <button onClick={() => deleteProperty(p._id)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Appointments ({appointments.length})</h3>
        {appointments.length === 0 ? <p style={{ color: '#6a6a72' }}>No appointments yet.</p> : (
          <div style={{ display: 'grid', gap: '8px' }}>
            {appointments.map(a => (
              <div key={a._id} style={{ padding: '12px', background: '#f7fafc', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{a.propertyId?.title}</strong>
                  <p style={{ fontSize: '13px', color: '#6a6a72' }}>{new Date(a.appointmentDate).toLocaleDateString()} at {a.startTime}</p>
                </div>
                <span style={{ fontSize: '12px', padding: '4px 12px', background: '#e2e8f0', borderRadius: '50px' }}>{a.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
