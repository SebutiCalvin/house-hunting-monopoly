require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected: localhost'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/properties', require('./src/routes/propertyRoutes'));
app.use('/api/appointments', require('./src/routes/appointmentRoutes'));
app.use('/api/notifications', require('./src/routes/notificationRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('🚀 Server running on http://localhost:' + PORT);
});
