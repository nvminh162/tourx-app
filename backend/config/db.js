const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('****************** @nvminh162 - MongoDB Connected');
    } catch (err) {
        console.error('xxxxx MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = { connectDB };