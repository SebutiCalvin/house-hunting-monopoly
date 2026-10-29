import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiHome, FiLayers, FiGrid, FiCoffee, FiBriefcase, FiShoppingBag } from 'react-icons/fi';

const categories = [
  { key: 'single_room_student', label: 'Student Rooms', icon: FiUsers, color: '#ff6b4a' },
  { key: 'single_room_worker', label: 'Worker Rooms', icon: FiCoffee, color: '#6c6cff' },
  { key: 'two_room', label: 'Two Room Units', icon: FiGrid, color: '#34c759' },
  { key: 'bachelor', label: 'Bachelors', icon: FiHome, color: '#ff9500' },
  { key: 'duplex', label: 'Duplexes', icon: FiLayers, color: '#e91e63' },
  { key: 'standalone_house', label: 'Standalone Houses', icon: FiHome, color: '#009688' },
  { key: 'apartment', label: 'Apartments', icon: FiBriefcase, color: '#3f51b5' },
  { key: 'commercial', label: 'Commercial', icon: FiShoppingBag, color: '#607d8b' },
];

const PropertyCategories = () => (
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
    <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Browse by Category</h1>
    <p style={{ color: '#6a6a72', marginBottom: '32px' }}>Find exactly what you are looking for</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <Link key={i} to={`/properties?category=${cat.key}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: '16px', padding: '32px 20px', textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)', transition: '0.2s',
            }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Icon size={32} color={cat.color} />
              </div>
              <div style={{ fontWeight: 600, color: '#1e1e2a' }}>{cat.label}</div>
            </div>
          </Link>
        );
      })}
    </div>
  </div>
);

export default PropertyCategories;
