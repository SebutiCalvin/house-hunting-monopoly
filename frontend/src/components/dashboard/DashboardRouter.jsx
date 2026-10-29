import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AgentDashboard from './AgentDashboard';
import UserDashboard from './UserDashboard';

const DashboardRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;
  }

  if (!user || user.role === 'guest') {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'admin': return <AdminDashboard />;
    case 'agent': return <AgentDashboard />;
    case 'tenant': return <UserDashboard />;
    default: return <UserDashboard />;
  }
};

export default DashboardRouter;
