const mongoose = require("mongoose");
const mongooseAutoInc = require('mongoose-plugin-autoinc');
const autoIncrement = mongooseAutoInc.autoIncrement;

const Schema = mongoose.Schema;

const purchaseSchema = Schema({
    _id : Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    date: {
        type: Date,
        default: Date.now,
    },
    items: [
        {
            id: Number,
            price: Number,
            quantity: Number,
        },
    ],
});
purchaseSchema.plugin(autoIncrement, { model: 'Purchase', field: '_id', startAt: 1 });
module.exports = mongoose.model("Purchase", purchaseSchema);
