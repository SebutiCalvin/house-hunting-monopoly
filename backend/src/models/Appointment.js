const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  tenantContact: { name: String, phone: String, email: String },
  agentContact: { name: String, phone: String, email: String },
  tenantMessage: String,
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
