import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const PropertyList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get('category');

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchProperties(); }, [categoryFromUrl]);

  const fetchProperties = async () => {
    try {
      const params = categoryFromUrl ? { category: categoryFromUrl } : {};
      const res = await axios.get('http://localhost:5000/api/properties', { params });
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = properties.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>
          {categoryFromUrl ? 'Filtered Properties' : 'All Properties'}
        </h1>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '50px', border: '1px solid #e2e8f0', width: '300px', outline: 'none' }}
        />
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px' }}>
          <div style={{ fontSize: '48px' }}>🏠</div>
          <p style={{ color: '#6a6a72' }}>No properties found</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filtered.map(prop => (
            <Link key={prop._id} to={`/property/${prop._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                <div style={{
                  height: '200px',
                  background: prop.images?.[0]?.url ? `url(${prop.images[0].url}) center/cover` : 'linear-gradient(135deg, #ff6b4a30, #6c6cff30)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px'
                }}>
                  {!prop.images?.[0]?.url && '🏠'}
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontWeight: 700 }}>{prop.title}</h3>
                  <p style={{ color: '#6a6a72', fontSize: '14px' }}>📍 {prop.location?.city}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                    <span style={{ color: '#ff6b4a', fontWeight: 700, fontSize: '20px' }}>M {prop.price?.toLocaleString()}</span>
                    <span style={{ color: '#9a9aa2', fontSize: '13px' }}>/mo</span>
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '13px', color: '#6a6a72' }}>
                    🛏️ {prop.bedrooms} · 🛁 {prop.bathrooms} · 👁️ {prop.views || 0}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
