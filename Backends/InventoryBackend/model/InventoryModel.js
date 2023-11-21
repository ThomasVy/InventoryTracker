const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  inventory: [
    {
      itemId: Number,
      name: String,
      stock: Number,
      cost: Number,
      type: {
        type: String,
        enum: ["Poster", "Keychain", "Other"],
        default: "Other",
      },
      reference: String,
      owner: String,
      imageLink: {
        type: String,
        default: "http://localhost:4000/images/no-image-icon.png",
      },
    },
  ],
});

module.exports = mongoose.model("Inventory", inventorySchema);
