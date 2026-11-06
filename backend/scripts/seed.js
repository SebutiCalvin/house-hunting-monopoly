const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const Property = require('../src/models/Property');
require('dotenv').config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/house_hunting_monopoly');
    console.log('📦 Connected to Cloud MongoDB');

    await Property.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️ Cleared existing data');

    const admin = new User({
      email: 'sebuticalvin@gmail.com',
      password: await bcrypt.hash('Oathkeeper22', 10),
      fullName: 'Sebuti Calvin',
      phone: '+26657266136',
      role: 'admin',
      isApproved: true,
    });
    await admin.save();
    console.log('👤 Admin created');

    const agent = new User({
      email: 'agent@househunting.com',
      password: await bcrypt.hash('Agent123!', 10),
      fullName: 'John Agent',
      phone: '+26658123456',
      role: 'agent',
      isApproved: true,
    });
    await agent.save();
    console.log('👤 Agent created');

    const properties = [
      {
        title: 'Ha Pita Villa – Single Room',
        description: 'Private single room with bathroom',
        location: { address: 'Ha Pita', city: 'Maseru', district: 'Ha Pita' },
        price: 1500, bedrooms: 1, bathrooms: 1,
        propertyCategory: 'single_room_worker', propertyType: 'Room',
        features: ['Bathroom', 'Wardrobe'],
        images: [{ url: '/images/properties/HaPitaVilla/1.jpg', isMain: true }],
        status: 'available',
        landlord: { name: 'Sebuti Calvin', phone: '+26657266136', whatsappNumber: '+26657266136' },
        agentId: agent._id,
      },
      {
        title: 'Qoaling Ha Besele – Two Room',
        description: 'Two room unit with ceiling and tiles',
        location: { address: 'Qoaling Ha Besele', city: 'Maseru', district: 'Qoaling' },
        price: 1800, bedrooms: 2, bathrooms: 1,
        propertyCategory: 'two_room', propertyType: 'Room',
        features: ['Ceiling', 'Tiles'],
        images: [{ url: '/images/properties/QoalingHaBesele/1.jpg', isMain: true }],
        status: 'available',
        landlord: { name: 'Sebuti Calvin', phone: '+26657266136', whatsappNumber: '+26657266136' },
        agentId: agent._id,
      },
      {
        title: 'Qoaling Ha Mampho – Two Room',
        description: 'Comfortable two room unit',
        location: { address: 'Qoaling Ha Mampho', city: 'Maseru', district: 'Qoaling' },
        price: 1700, bedrooms: 2, bathrooms: 1,
        propertyCategory: 'two_room', propertyType: 'Room',
        features: ['Ceiling', 'Secure Yard'],
        images: [{ url: '/images/properties/QoalingHaMampho/1.jpg', isMain: true }],
        status: 'available',
        landlord: { name: 'Sebuti Calvin', phone: '+26657266136', whatsappNumber: '+26657266136' },
        agentId: agent._id,
      },
      {
        title: 'Sea Point Blues – Bachelor',
        description: 'Modern bachelor unit with fitted kitchen',
        location: { address: 'Sea Point Blues', city: 'Maseru', district: 'Sea Point' },
        price: 4000, bedrooms: 1, bathrooms: 1,
        propertyCategory: 'bachelor', propertyType: 'Bachelor',
        features: ['Fitted Kitchen', 'Lounge', 'Wardrobe'],
        images: [{ url: '/images/properties/SeaPointBlues/1.jpg', isMain: true }],
        status: 'available',
        landlord: { name: 'Sebuti Calvin', phone: '+26657266136', whatsappNumber: '+26657266136' },
        agentId: agent._id,
      },
      {
        title: 'Standalone Duplex at Sea Point',
        description: 'Beautiful standalone duplex with 2 bedrooms',
        location: { address: 'Sea Point Fokothi', city: 'Maseru', district: 'Sea Point' },
        price: 7500, bedrooms: 2, bathrooms: 2,
        propertyCategory: 'duplex', propertyType: 'Duplex',
        features: ['Fitted Wardrobes', 'Garden', 'Parking'],
        images: [{ url: '/images/properties/standalone-house/1.jpg', isMain: true }],
        status: 'available',
        landlord: { name: 'Sebuti Calvin', phone: '+26657266136', whatsappNumber: '+26657266136' },
        agentId: agent._id,
      },
    ];

    await Property.insertMany(properties);
    console.log(`🏠 ${properties.length} properties created`);
    console.log('✅ Cloud Database seeded!');
    console.log('Admin: sebuticalvin@gmail.com / Oathkeeper22');
    console.log('Agent: agent@househunting.com / Agent123!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seed();
