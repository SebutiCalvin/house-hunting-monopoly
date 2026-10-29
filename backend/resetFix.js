const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
require('dotenv').config();

const reset = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/house_hunting_monopoly');
    
    // Delete all users to remove any old broken passwords
    await User.deleteMany({});
    console.log('🗑️ Cleared all users');

    // Hash the password manually
    const hashedPassword = await bcrypt.hash('Oathkeeper22', 10);

    // Create the admin
    const admin = new User({
      email: 'sebuticalvin@gmail.com',
      password: hashedPassword,
      fullName: 'Sebuti Calvin',
      phone: '+26657266136',
      role: 'admin',
      isApproved: true,
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('📧 Email: sebuticalvin@gmail.com');
    console.log('🔑 Password: Oathkeeper22');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

reset();
