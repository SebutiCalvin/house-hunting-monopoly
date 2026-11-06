import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FiUsers, FiHome, FiCalendar, FiEye, FiUserCheck, FiPlus, FiEdit2, FiTrash2, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [pendingAgents, setPendingAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, usersRes, propsRes] = await Promise.all([
        axios.get('https://house-hunting-monopoly.onrender.com/api/admin/stats', { headers }),
        axios.get('https://house-hunting-monopoly.onrender.com/api/admin/users', { headers }),
        axios.get('https://house-hunting-monopoly.onrender.com/api/properties', { headers }),
      ]);

      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
      setProperties(propsRes.data.properties);
      setPendingAgents(usersRes.data.users.filter(u => u.role === 'agent' && !u.isApproved));
    } catch (err) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const approveAgent = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://house-hunting-monopoly.onrender.com/api/admin/users/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Approved');
      fetchAll();
    } catch { toast.error('Failed'); }
  };

  const rejectAgent = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://house-hunting-monopoly.onrender.com/api/admin/users/${id}/reject`, {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Rejected');
      fetchAll();
    } catch { toast.error('Failed'); }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://house-hunting-monopoly.onrender.com/api/properties/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Deleted');
      fetchAll();
    } catch { toast.error('Failed'); }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;

  const cards = [
    { label: 'Users', value: stats?.totalUsers || 0, icon: FiUsers, color: '#6c6cff' },
    { label: 'Properties', value: stats?.totalProperties || 0, icon: FiHome, color: '#34c759' },
    { label: 'Appointments', value: stats?.totalAppointments || 0, icon: FiCalendar, color: '#ff9500' },
    { label: 'Pending Agents', value: pendingAgents.length, icon: FiUserCheck, color: '#ff6b4a' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700 }}>Admin <span style={{ color: '#ff6b4a' }}>Dashboard</span></h1>
        <Link to="/add-property" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiPlus /> Add Property</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <c.icon size={28} color={c.color} style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '28px', fontWeight: 700 }}>{c.value}</div>
            <div style={{ color: '#6a6a72' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {pendingAgents.length > 0 && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '16px' }}><FiUserCheck color="#ff9500" /> Pending Agent Approvals ({pendingAgents.length})</h3>
          {pendingAgents.map(agent => (
            <div key={agent._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f7fafc', borderRadius: '8px', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <strong>{agent.fullName}</strong>
                <p style={{ fontSize: '13px', color: '#6a6a72' }}>{agent.email}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => approveAgent(agent._id)} style={{ padding: '6px 16px', background: '#34c759', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
                  <FiCheckCircle /> Approve
                </button>
                <button onClick={() => rejectAgent(agent._id)} style={{ padding: '6px 16px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
                  <FiXCircle /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Properties ({properties.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '10px', color: '#6a6a72', fontSize: '13px' }}>Title</th>
              <th style={{ textAlign: 'left', padding: '10px', color: '#6a6a72', fontSize: '13px' }}>Price</th>
              <th style={{ textAlign: 'left', padding: '10px', color: '#6a6a72', fontSize: '13px' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '10px', color: '#6a6a72', fontSize: '13px' }}>Actions</th>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
