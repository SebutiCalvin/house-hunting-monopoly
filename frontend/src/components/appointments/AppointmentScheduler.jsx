import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { FiX } from 'react-icons/fi';

const AppointmentScheduler = ({ propertyId, property, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const days = [];
  for (let i = 0; i < 14; i++) days.push(addDays(new Date(), i));

  const timeSlots = [];
  for (let h = 9; h < 17; h++) {
    for (let m = 0; m < 60; m += 30) {
      timeSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }

  const handleBook = async () => {
    if (!selectedTime) { toast.warning('Select a time'); return; }
    if (!user) { toast.info('Please login'); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/appointments', {
        propertyId,
        appointmentDate: format(selectedDate, 'yyyy-MM-dd'),
        startTime: selectedTime,
        endTime: selectedTime,
        tenantMessage: message,
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Appointment booked!');
      onSuccess && onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '500px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Schedule Viewing</h2>
          <FiX size={24} style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>
        <p style={{ color: '#6a6a72', marginBottom: '16px' }}><strong>{property?.title}</strong></p>

        <label style={{ fontWeight: 500, display: 'block', marginBottom: '6px' }}>Select Date</label>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
          {days.map((date, i) => (
            <button key={i} onClick={() => setSelectedDate(date)} style={{
              flex: '0 0 auto', padding: '8px 12px', borderRadius: '8px',
              border: selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? '2px solid #ff6b4a' : '1px solid #ddd',
              background: selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? 'rgba(255,107,74,0.08)' : 'transparent',
              cursor: 'pointer',
            }}>
              <div style={{ fontSize: '12px', color: '#6a6a72' }}>{format(date, 'EEE')}</div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>{format(date, 'd')}</div>
            </button>
          ))}
        </div>

        <label style={{ fontWeight: 500, display: 'block', marginBottom: '6px' }}>Select Time</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '16px' }}>
          {timeSlots.map(time => (
            <button key={time} onClick={() => setSelectedTime(time)} style={{
              padding: '6px 0', borderRadius: '6px', cursor: 'pointer',
              border: selectedTime === time ? '2px solid #ff6b4a' : '1px solid #ddd',
              background: selectedTime === time ? 'rgba(255,107,74,0.08)' : 'transparent',
              fontSize: '13px',
            }}>{time}</button>
          ))}
        </div>

        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message to agent (optional)" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '16px', minHeight: '60px' }} />

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#e2e8f0', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleBook} disabled={loading || !selectedTime} className="btn-primary" style={{ flex: 2, padding: '12px', opacity: loading || !selectedTime ? 0.6 : 1 }}>
            {loading ? 'Booking...' : 'Book Viewing'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
