import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './components/pages/HomePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PropertyList from './components/properties/PropertyList';
import PropertyDetail from './components/properties/PropertyDetail';
import PropertyCategories from './components/properties/PropertyCategories';
import AddProperty from './components/properties/AddProperty';
import EditProperty from './components/properties/EditProperty';
import AdvertiseForm from './components/advertising/AdvertiseForm';
import WhatsAppChatButton from './components/whatsapp/WhatsAppChatButton';
import AppointmentsDashboard from './components/appointments/AppointmentsDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import AgentDashboard from './components/dashboard/AgentDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import DashboardRouter from './components/dashboard/DashboardRouter';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1, paddingTop: '100px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertyList />} />
              <Route path="/categories" element={<PropertyCategories />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/edit-property/:id" element={<EditProperty />} />
              <Route path="/advertise" element={<AdvertiseForm />} />
              <Route path="/appointments" element={<AppointmentsDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<DashboardRouter />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppChatButton />
        </div>
        <ToastContainer position="bottom-right" theme="colored" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
