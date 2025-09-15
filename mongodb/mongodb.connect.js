const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookdb';

async function connect() {
    try {
        await mongoose.connect(MONGO_URI)
        //console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
module.exports = { connect }