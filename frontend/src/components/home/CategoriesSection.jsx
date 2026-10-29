import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiHome, FiLayers, FiGrid, FiCoffee } from 'react-icons/fi';

const categories = [
  { name: 'Student Rooms', icon: FiUsers, color: '#ff6b4a', key: 'single_room_student' },
  { name: 'Worker Rooms', icon: FiCoffee, color: '#6c6cff', key: 'single_room_worker' },
  { name: 'Two Room Units', icon: FiGrid, color: '#34c759', key: 'two_room' },
  { name: 'Bachelors', icon: FiHome, color: '#ff9500', key: 'bachelor' },
  { name: 'Duplexes', icon: FiLayers, color: '#e91e63', key: 'duplex' },
];

const CategoriesSection = () => (
  <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
    <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '32px' }}>
      Browse by <span style={{ color: '#ff6b4a' }}>Category</span>
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} whileHover={{ scale: 1.05, y: -4 }} style={{
            background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.9)', borderRadius: '16px',
            padding: '24px', textAlign: 'center', cursor: 'pointer',
          }}>
            <Link to={`/properties?category=${cat.key}`} style={{ textDecoration: 'none', color: '#1e1e2a' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Icon size={28} color={cat.color} />
              </div>
              <div style={{ fontWeight: 600 }}>{cat.name}</div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default CategoriesSection;
