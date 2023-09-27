const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    name : {
        type: String,
        required: true
    },
    stock : {
        type: Number,
        required: true
    },
    cost : {
        type: Number,
        required: true
    },
    reference : {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Inventory', inventorySchema);