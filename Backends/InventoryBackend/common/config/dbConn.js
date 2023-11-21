const mongoose = require('mongoose');

const connectDB = async (URI) => {
    try {
        await mongoose.connect(URI);
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB