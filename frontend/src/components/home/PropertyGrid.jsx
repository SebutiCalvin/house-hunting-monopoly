import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PropertyGrid = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => setProperties(res.data.properties || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;

  return (
    <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '32px' }}>
        Featured <span style={{ color: '#ff6b4a' }}>Properties</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {properties.map((prop, i) => (
          <motion.div key={prop._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
          >
            <Link to={'/property/' + prop._id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                height: '200px',
                background: prop.images?.[0]?.url ? 'url(' + prop.images[0].url + ') center/cover' : 'linear-gradient(135deg, #ff6b4a30, #6c6cff30)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px',
              }}>
                {!prop.images?.[0]?.url && '🏠'}
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '4px' }}>{prop.title}</h3>
                <p style={{ color: '#6a6a72', fontSize: '14px' }}>📍 {prop.location?.city || 'Lesotho'}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                  <span style={{ color: '#ff6b4a', fontWeight: 700, fontSize: '20px' }}>M {prop.price?.toLocaleString()}</span>
                  <span style={{ color: '#9a9aa2', fontSize: '13px' }}>/mo</span>
                </div>
                <div style={{ marginTop: '8px', fontSize: '13px', color: '#6a6a72' }}>
                  🛏️ {prop.bedrooms} · 🛁 {prop.bathrooms} · 👁️ {prop.views || 0}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PropertyGrid;