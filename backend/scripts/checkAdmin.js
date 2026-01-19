require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const checkAdmins = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ca-consultancy");
        console.log('Connected to MongoDB');
        
        const admins = await Admin.find({});
        console.log(`Found ${admins.length} admins.`);
        admins.forEach(admin => {
            console.log(`- Username: ${admin.username}, Email: ${admin.email}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkAdmins();
