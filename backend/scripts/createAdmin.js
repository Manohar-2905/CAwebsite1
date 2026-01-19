require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ca-consultancy");
    console.log('MongoDB Connected');

    const adminExists = await Admin.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    const admin = new Admin({
      username: 'admin',
      email: 'admin@example.com',
      password: 'password123'
    });

    await admin.save();
    console.log('Admin registered successfully');
    console.log('Credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error registering admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
