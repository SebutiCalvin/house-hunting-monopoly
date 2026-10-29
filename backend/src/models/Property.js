const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    address: String,
    city: String,
    district: String,
  },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  propertyCategory: { type: String, required: true },
  propertyType: { type: String, required: true },
  features: [String],
  images: [{ url: String, isMain: Boolean }],
  status: { type: String, enum: ['available', 'rented', 'maintenance', 'pending'], default: 'available' },
  views: { type: Number, default: 0 },
  landlord: {
    name: String,
    phone: String,
    whatsappNumber: String,
  },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
