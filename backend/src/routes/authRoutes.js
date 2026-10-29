const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Notification = require('../models/Notification');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, phone, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User exists' });

    const user = new User({
      email,
      password,
      fullName,
      phone,
      role: role || 'tenant',
      isApproved: role === 'tenant' ? true : false,
    });
    await user.save();

    if (role === 'agent') {
      const admins = await User.find({ role: 'admin' });
      const notifications = admins.map(admin => ({
        userId: admin._id,
        type: 'agent_approval',
        title: 'New Agent Registration',
        message: fullName + ' registered as an agent. Please approve.',
        link: '/admin',
      }));
      if (notifications.length) await Notification.insertMany(notifications);
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, email: user.email, fullName: user.fullName, role: user.role, phone: user.phone },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: { id: user._id, email: user.email, fullName: user.fullName, role: user.role, phone: user.phone },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
