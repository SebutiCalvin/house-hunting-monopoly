import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';

const getPropertyType = (cat) => {
  const map = {
    'single_room_student': 'Room', 'single_room_worker': 'Room',
    'two_room': 'Room', 'bachelor': 'Bachelor', 'duplex': 'Duplex',
    'standalone_house': 'House', 'apartment': 'Apartment', 'commercial': 'Commercial',
  };
  return map[cat] || 'House';
};

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '',
    'location.address': '', 'location.city': '',
    price: '', bedrooms: '', bathrooms: '',
    propertyCategory: 'standalone_house',
    features: [],
    'landlord.name': '', 'landlord.phone': '',
    status: 'available',
  });
  const [featureInput, setFeatureInput] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm({ ...form, features: [...form.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const data = {
        title: form.title,
        description: form.description,
        location: { address: form['location.address'], city: form['location.city'] },
        price: parseFloat(form.price),
        bedrooms: parseInt(form.bedrooms),
        bathrooms: parseInt(form.bathrooms),
        propertyCategory: form.propertyCategory,
        propertyType: getPropertyType(form.propertyCategory),
        features: form.features,
        landlord: {
          name: form['landlord.name'],
          phone: form['landlord.phone'],
          whatsappNumber: form['landlord.phone'],
        },
        status: form.status,
      };
      await axios.post('http://localhost:5000/api/properties', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Property added!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>Add Property</h1>
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div><label style={{ fontWeight: 500 }}>Title</label><input name="title" value={form.title} onChange={handleChange} className="input-modern" required /></div>
          <div><label style={{ fontWeight: 500 }}>Description</label><textarea name="description" value={form.description} onChange={handleChange} rows="4" className="input-modern" required /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={{ fontWeight: 500 }}>Address</label><input name="location.address" value={form['location.address']} onChange={handleChange} className="input-modern" required /></div>
            <div><label style={{ fontWeight: 500 }}>City</label><input name="location.city" value={form['location.city']} onChange={handleChange} className="input-modern" required /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div><label style={{ fontWeight: 500 }}>Price (M)</label><input name="price" type="number" value={form.price} onChange={handleChange} className="input-modern" required /></div>
            <div><label style={{ fontWeight: 500 }}>Bedrooms</label><input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} className="input-modern" required /></div>
            <div><label style={{ fontWeight: 500 }}>Bathrooms</label><input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} className="input-modern" required /></div>
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Category</label>
            <select name="propertyCategory" value={form.propertyCategory} onChange={handleChange} className="input-modern">
              <option value="single_room_student">Student Room</option>
              <option value="single_room_worker">Worker Room</option>
              <option value="two_room">Two Room</option>
              <option value="bachelor">Bachelor</option>
              <option value="duplex">Duplex</option>
              <option value="standalone_house">Standalone House</option>
              <option value="apartment">Apartment</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Features</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={featureInput} onChange={e => setFeatureInput(e.target.value)} placeholder="e.g. Parking" className="input-modern" style={{ flex: 1 }} />
              <button type="button" onClick={addFeature} style={{ padding: '0 20px', background: '#ff6b4a', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}><FiPlus /></button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {form.features.map((f, i) => (
                <span key={i} style={{ padding: '4px 12px', background: '#f0f0f5', borderRadius: '50px', fontSize: '13px' }}>{f}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={{ fontWeight: 500 }}>Landlord Name</label><input name="landlord.name" value={form['landlord.name']} onChange={handleChange} className="input-modern" required /></div>
            <div><label style={{ fontWeight: 500 }}>Landlord Phone</label><input name="landlord.phone" value={form['landlord.phone']} onChange={handleChange} className="input-modern" required /></div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '14px', fontSize: '16px' }}>
            {loading ? 'Adding...' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
