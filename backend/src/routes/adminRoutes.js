const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');
const Appointment = require('../models/Appointment');
const { authenticateJWT, isAdmin } = require('../middleware/auth');

router.get('/stats', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProperties = await Property.countDocuments({ isActive: true });
    const totalAppointments = await Appointment.countDocuments();
    res.json({ success: true, stats: { totalUsers, totalProperties, totalAppointments, totalViews: 0 } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/users/:id/approve', authenticateJWT, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isApproved: true, role: 'agent' });
    res.json({ success: true, message: 'Approved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/users/:id/reject', authenticateJWT, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isApproved: false, role: 'tenant' });
    res.json({ success: true, message: 'Rejected' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
