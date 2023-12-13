import { model, Schema, InferSchemaType, Types } from "mongoose";
import {autoIncrement} from 'mongoose-plugin-autoinc';
import {z} from "zod";
import { FormatForExternal } from "../utils/FormatDataExternal";

const IndividualPurchaseItemZodSchema = z.object({
    id: z.number().optional(),
    price: z.number().positive({message: "Must be a postive number"}),
    quantity: z.number().positive({message: "Must be a postive number"})
});

export type IndividualPurchaseItem = z.infer<typeof IndividualPurchaseItemZodSchema>;

const PurchaseZodSchema = z.object({
    id: z.number().optional(),
    userId: z.string(),
    date: z.coerce.date(),
    items: z.array(IndividualPurchaseItemZodSchema).min(1, {message: "Must be at least one item"})
});

export const PurchaseExternalZodSchema = FormatForExternal(PurchaseZodSchema);

export type PurchaseType = z.infer<typeof PurchaseZodSchema>;
const purchaseSchema = new Schema<PurchaseType>({
    id : Number,
    userId: String,
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
purchaseSchema.plugin(autoIncrement, { model: 'Purchase', field: 'id', startAt: 1 });

export type purchaseModelType = InferSchemaType<typeof purchaseSchema>;

export default model("Purchase", purchaseSchema);
