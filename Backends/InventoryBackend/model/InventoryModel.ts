import { Schema, model, Types } from "mongoose";
import {autoIncrement} from 'mongoose-plugin-autoinc';

export interface InventoryType {
  id?: Number,
  name: String,
  stock: Number,
  cost: Number,
  type: "Poster" | "Keychain" | "Other",
  reference: String,
  owner: String,
  imageLink?: String,
  userId: string;
}

const inventorySchema = new Schema<InventoryType>({
  id: Number,
  userId: String,
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
    required: false,
    default: "http://localhost:4000/images/no-image-icon.png",
  },
});

inventorySchema.plugin(autoIncrement, { model: 'Inventory', field: 'id', startAt: 1 });

export default model("Inventory", inventorySchema);
