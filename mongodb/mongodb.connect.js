const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://root:passwordTest1234@localhost:27017/todos?authSource=admin')
        //console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
module.exports = { connect }