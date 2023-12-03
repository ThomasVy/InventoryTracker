import { model, Schema, InferSchemaType, Types } from "mongoose";
import {autoIncrement} from 'mongoose-plugin-autoinc';

export interface IndividualPurchaseItem {
    id: Number,
    price: Number,
    quantity: Number
}

export interface PurchaseType {
    id?: number,
    userId: string,
    date: Date,
    items: Types.Array<IndividualPurchaseItem>
}

const purchaseSchema = new Schema({
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
