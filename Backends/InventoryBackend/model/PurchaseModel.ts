import { model, Schema, InferSchemaType, Types} from "mongoose";
import {z} from "zod";

const IndividualPurchaseItemZodSchema = z.object({
    id: z.string(),
    price: z.number().nonnegative({message: "Must be >0 number"}),
    quantity: z.number().nonnegative({message: "Must be >0 number"})
});

export const purchaseEntitySchema = z.object({
    _id: z.instanceof(Types.ObjectId),
    userId: z.string(),
    date: z.coerce.date(),
    items: z.array(IndividualPurchaseItemZodSchema).min(1, {message: "Must be at least one item"})
})

export type PurchaseEntity = z.infer<typeof purchaseEntitySchema>;

const purchaseDTOSchema = purchaseEntitySchema.omit({_id: true, userId: true}).merge(z.object({id: z.string()}));

export type PurchaseDTO = z.infer<typeof purchaseDTOSchema>;

const purchaseDTOMiniSchema = purchaseDTOSchema.pick({id: true});
export type PurchaseDTOMini = z.infer<typeof purchaseDTOMiniSchema>;

export const PurchaseDTO = {
    convertFromEntity({_id, ...entity}: PurchaseEntity): PurchaseDTO {
        const candidate: PurchaseDTO = {
            id: _id.toHexString(),
            ...entity
        }
        return purchaseDTOSchema.parse(candidate);
    },
    convertToMiniDTO({_id}: PurchaseEntity) {
        const candidate : PurchaseDTOMini = {
            id: _id.toHexString()
        }
        return purchaseDTOMiniSchema.parse(candidate);
    }
}

const purchaseSchema = new Schema<PurchaseEntity>({
    userId: String,
    date: {
        type: Date,
    },
    items: [
        {
            id: String,
            price: Number,
            quantity: Number,
        },
    ],
});

export const Purchase =  model("Purchase", purchaseSchema);