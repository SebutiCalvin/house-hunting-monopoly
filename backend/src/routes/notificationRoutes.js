const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { authenticateJWT } = require('../middleware/auth');

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    const unreadCount = await Notification.countDocuments({ userId: req.user.userId, read: false });
    res.json({ success: true, notifications, unreadCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/read', authenticateJWT, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/read-all', authenticateJWT, async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.user.userId, read: false }, { read: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
