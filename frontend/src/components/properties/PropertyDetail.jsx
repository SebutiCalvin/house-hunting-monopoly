import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AppointmentScheduler from '../appointments/AppointmentScheduler';
import { useAuth } from '../../context/AuthContext';

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScheduler, setShowScheduler] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { fetchProperty(); }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
      setProperty(res.data.property);
    } catch (err) {
      toast.error('Property not found');
      navigate('/properties');
    } finally {
      setLoading(false);
    }
  };

  const handleInterest = async () => {
    if (!user) { toast.info('Please login'); navigate('/login'); return; }
    try {
      await axios.post(`http://localhost:5000/api/properties/${id}/interest`);
      toast.success('Interest expressed!');
    } catch (err) { toast.error('Failed'); }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;
  if (!property) return <div style={{ textAlign: 'center', padding: '60px' }}>Not found</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 12px 40px rgba(0,0,0,0.04)' }}>
        <div style={{
          height: '400px', borderRadius: '16px',
          background: property.images?.[0]?.url ? `url(${property.images[0].url}) center/cover` : 'linear-gradient(135deg, #ff6b4a30, #6c6cff30)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px'
        }}>
          {!property.images?.[0]?.url && '🏠'}
        </div>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>{property.title}</h1>
          <p style={{ color: '#6a6a72', marginBottom: '16px' }}>📍 {property.location?.address}, {property.location?.city}</p>
          <div style={{ display: 'flex', gap: '24px', padding: '16px', background: '#f7fafc', borderRadius: '12px', marginBottom: '16px' }}>
            <div><strong>M {property.price?.toLocaleString()}</strong> /mo</div>
            <div><strong>{property.bedrooms}</strong> beds</div>
            <div><strong>{property.bathrooms}</strong> baths</div>
          </div>
          <p style={{ color: '#4a5568', lineHeight: 1.7 }}>{property.description}</p>
          {property.features?.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Features</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {property.features.map((f, i) => (
                  <span key={i} style={{ padding: '4px 12px', background: '#edf2f7', borderRadius: '50px', fontSize: '13px' }}>{f}</span>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => setShowScheduler(true)} className="btn-primary">📅 Schedule Viewing</button>
            <button onClick={handleInterest} style={{ padding: '12px 24px', background: 'transparent', color: '#ff6b4a', border: '2px solid #ff6b4a', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}>❤️ Express Interest</button>
          </div>
        </div>
      </div>
      {showScheduler && (
        <AppointmentScheduler
          propertyId={property._id}
          property={property}
          onClose={() => setShowScheduler(false)}
          onSuccess={() => { setShowScheduler(false); toast.success('Appointment booked!'); }}
        />
      )}
    </div>
  );
};

export default PropertyDetail;
