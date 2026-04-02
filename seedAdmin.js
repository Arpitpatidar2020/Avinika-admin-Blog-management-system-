const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config({ quiet: true });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const existingAdmin = await Admin.findOne({ email: 'admin@avinika.com' });
        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit();
        }

        const admin = new Admin({
            name: 'Avinika Admin',
            email: 'admin@avinika.com',
            password: 'adminpassword123', // Will be hashed by pre-save hook
        });

        await admin.save();
        console.log('Admin user created successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
