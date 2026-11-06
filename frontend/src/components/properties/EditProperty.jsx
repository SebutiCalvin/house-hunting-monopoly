import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const getPropertyType = (cat) => {
  const map = {
    'single_room_student': 'Room', 'single_room_worker': 'Room',
    'two_room': 'Room', 'bachelor': 'Bachelor', 'duplex': 'Duplex',
    'standalone_house': 'House', 'apartment': 'Apartment', 'commercial': 'Commercial',
  };
  return map[cat] || 'House';
};

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    title: '', description: '',
    'location.address': '', 'location.city': '',
    price: '', bedrooms: '', bathrooms: '',
    propertyCategory: 'standalone_house',
    'landlord.name': '', 'landlord.phone': '',
    status: 'available',
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`https://house-hunting-monopoly.onrender.com/api/properties/${id}`);
        const prop = res.data.property;
        setForm({
          title: prop.title || '',
          description: prop.description || '',
          'location.address': prop.location?.address || '',
          'location.city': prop.location?.city || '',
          price: prop.price || '',
          bedrooms: prop.bedrooms || '',
          bathrooms: prop.bathrooms || '',
          propertyCategory: prop.propertyCategory || 'standalone_house',
          'landlord.name': prop.landlord?.name || '',
          'landlord.phone': prop.landlord?.phone || '',
          status: prop.status || 'available',
        });
      } catch (err) {
        toast.error('Failed to load');
        navigate('/dashboard');
      } finally {
        setFetching(false);
      }
    };
    fetchProperty();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
        landlord: { name: form['landlord.name'], phone: form['landlord.phone'], whatsappNumber: form['landlord.phone'] },
        status: form.status,
      };
      await axios.put(`https://house-hunting-monopoly.onrender.com/api/properties/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Updated!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>Edit Property</h1>
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div><label>Title</label><input name="title" value={form.title} onChange={handleChange} className="input-modern" required /></div>
          <div><label>Description</label><textarea name="description" value={form.description} onChange={handleChange} rows="4" className="input-modern" required /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label>Address</label><input name="location.address" value={form['location.address']} onChange={handleChange} className="input-modern" required /></div>
            <div><label>City</label><input name="location.city" value={form['location.city']} onChange={handleChange} className="input-modern" required /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div><label>Price (M)</label><input name="price" type="number" value={form.price} onChange={handleChange} className="input-modern" required /></div>
            <div><label>Bedrooms</label><input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} className="input-modern" required /></div>
            <div><label>Bathrooms</label><input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} className="input-modern" required /></div>
          </div>
          <div>
            <label>Category</label>
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
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="input-modern">
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '14px' }}>
            {loading ? 'Updating...' : 'Update Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;
