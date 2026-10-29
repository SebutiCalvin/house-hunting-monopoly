const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Property = require('../models/Property');
const User = require('../models/User');
const { authenticateJWT, isAgentOrAdmin } = require('../middleware/auth');

// CREATE appointment
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { propertyId, appointmentDate, startTime, endTime, tenantMessage } = req.body;
    const tenant = await User.findById(req.user.userId);
    const property = await Property.findById(propertyId).populate('agentId');

    if (!property) return res.status(404).json({ message: 'Property not found' });

    const appointment = new Appointment({
      propertyId,
      tenantId: req.user.userId,
      agentId: property.agentId,
      appointmentDate: new Date(appointmentDate),
      startTime,
      endTime: endTime || startTime,
      tenantMessage,
      tenantContact: { name: tenant.fullName, phone: tenant.phone, email: tenant.email },
      agentContact: { name: property.agentId.fullName, phone: property.agentId.phone, email: property.agentId.email },
    });
    await appointment.save();
    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET user appointments
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [{ tenantId: req.user.userId }, { agentId: req.user.userId }],
    }).populate('propertyId', 'title');
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET agent appointments
router.get('/agent', authenticateJWT, isAgentOrAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find({ agentId: req.user.userId }).populate('propertyId', 'title');
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CONFIRM appointment
router.put('/:id/confirm', authenticateJWT, isAgentOrAdmin, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Not found' });
    appointment.status = 'confirmed';
    await appointment.save();
    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CANCEL appointment
router.put('/:id/cancel', authenticateJWT, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Not found' });
    appointment.status = 'cancelled';
    await appointment.save();
    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
