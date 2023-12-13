import { Schema, model } from "mongoose";
import {autoIncrement} from 'mongoose-plugin-autoinc';
import { z } from "zod";

const InventoryZodSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  stock: z.number().positive(),
  cost: z.number().positive(),
  type: z.enum(["Poster", "Keychain", "Other"]),
  reference: z.string(),
  owner: z.string(),
  imageLink: z.string().optional(),
  userId: z.string()
});

export type InventoryTypeInternal = z.infer<typeof InventoryZodSchema>;

export const InventoryZodExternal =  InventoryZodSchema.omit({userId: true});

export type InventoryTypeExternal = z.infer<typeof InventoryZodExternal>;

const inventorySchema = new Schema<InventoryTypeInternal>({
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
