import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const HeroSection = () => (
  <section style={{
    position: 'relative', height: '80vh', minHeight: '500px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', borderRadius: '0 0 40px 40px', margin: '0 20px 60px',
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80)',
      backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6)',
    }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,30,42,0.7), rgba(0,0,0,0.3))' }} />
    <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', padding: '0 24px', textAlign: 'center', color: 'white' }}>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 800, marginBottom: '12px' }}>
        Find Your <span style={{ color: '#ff6b4a' }}>Perfect</span> Home
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
        Discover properties in Lesotho curated by local agents
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{
        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)', borderRadius: '60px',
        padding: '8px 8px 8px 24px', display: 'flex', alignItems: 'center', gap: '8px',
        maxWidth: '600px', margin: '0 auto',
      }}>
        <FiSearch color="white" size={20} />
        <input type="text" placeholder="Search by location, price, or category..." style={{
          flex: 1, padding: '12px 0', background: 'transparent', border: 'none',
          outline: 'none', color: 'white', fontSize: '15px', fontFamily: 'Inter, sans-serif',
        }} />
        <button style={{ background: '#ff6b4a', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}>Search</button>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
