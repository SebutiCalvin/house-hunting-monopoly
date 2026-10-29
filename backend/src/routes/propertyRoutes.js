const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { authenticateJWT, isAgentOrAdmin } = require('../middleware/auth');

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET agent properties
router.get('/agent', authenticateJWT, isAgentOrAdmin, async (req, res) => {
  try {
    const properties = await Property.find({ agentId: req.user.userId, isActive: true });
    res.json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Not found' });
    property.views += 1;
    await property.save();
    res.json({ success: true, property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE property
router.post('/', authenticateJWT, isAgentOrAdmin, async (req, res) => {
  try {
    const property = new Property({ ...req.body, agentId: req.user.userId });
    await property.save();
    res.status(201).json({ success: true, property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE property
router.put('/:id', authenticateJWT, isAgentOrAdmin, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Not found' });
    Object.assign(property, req.body);
    await property.save();
    res.json({ success: true, property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE status
router.put('/:id/status', authenticateJWT, isAgentOrAdmin, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Not found' });
    property.status = req.body.status;
    await property.save();
    res.json({ success: true, property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE property
router.delete('/:id', authenticateJWT, isAgentOrAdmin, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Not found' });
    property.isActive = false;
    await property.save();
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
