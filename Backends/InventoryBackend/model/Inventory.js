const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  inventory: [
    {
      itemId: {
        type: Number,
      },
      name: {
        type: String,
      },
      stock: {
        type: Number,
      },
      cost: {
        type: Number,
      },
      type: {
        type: String,
        enum: ["Poster", "Keychain", "Other"],
        default: "Other",
      },
      reference: {
        type: String,
      },
    },
  ],
  purchases: [
    {
      itemId: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Inventory", inventorySchema);
