const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin', 'agent', 'tenant'], default: 'tenant' },
  isApproved: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
