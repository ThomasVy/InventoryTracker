import { Purchase, PurchaseDTO, purchaseEntitySchema } from '../model/PurchaseModel';
import { Types } from "mongoose"
import { StatusError } from "../types/error";
import { uuidParser } from "../utils/IdParse";

async function createPurchase(dto: Omit<PurchaseDTO, "id" | "date">, userId: string): Promise<PurchaseDTO> {
    const candidate = purchaseEntitySchema.parse({
        ...dto,
        date: new Date(),
        _id: new Types.ObjectId(),
        userId
    });
    const purchase = (await Purchase.create(candidate)).toObject();
    return PurchaseDTO.convertFromEntity(purchase);
}

async function deletePurchase(id: string, userId: string): Promise<void> {
    const safeId = new Types.ObjectId(uuidParser.parse(id));
    await Purchase.deleteOne({ _id: safeId, userId });
}

async function getPurchase(id: string, userId: string): Promise<PurchaseDTO> {
    const safeId = new Types.ObjectId(uuidParser.parse(id));
    const purchase = (await Purchase.findOne({ _id: safeId, userId }))?.toObject();
    if (!purchase)
        throw new StatusError(`No order with id ${id} exists`, { statusCode: 404 });
    return PurchaseDTO.convertFromEntity(purchase);
}

async function updatePurchase(id: string, dto: Omit<Partial<PurchaseDTO>, "id">, userId: string)
    : Promise<PurchaseDTO> {
    const safeId = new Types.ObjectId(uuidParser.parse(id));
    const candidate = purchaseEntitySchema.omit({ userId: true, id: true }).partial().parse(dto);

    const updatedPurchase = (await Purchase.findOneAndUpdate(
        { _id: safeId, userId },
        { $set: candidate },
        { returnDocument: "after" }))?.toObject();

    if (!updatedPurchase)
        throw new StatusError(`No order with id ${id} exists`, { statusCode: 404 });

    return PurchaseDTO.convertFromEntity(updatedPurchase);
}

async function getTotalNumberOfPurchases(userId: string, search: string) {
    return await Purchase.countDocuments({ userId });
}

async function getPurchases(userId: string, search: string, limit?: number, skip?: number) {
    const query = Purchase.aggregate([
        { $addFields: { convertedId: { $toString: "$_id" } } },
        {
            $match: {
                convertedId: {
                    $regex: search,
                    $options: "i"
                },
                userId
            }
        },
        { $project: { convertedId: 0 } }
    ])
    if (skip != null) {
        query.skip(skip);
    }
    if (limit != null) {
        query.limit(limit);
    }
    const purchases = await query;
    if (purchases.length == 0)
        throw new StatusError("Nothing Found", { statusCode: 204 });

    const purchasesDTO = purchases.map((purchase) => {
        return PurchaseDTO.convertToMiniDTO(purchase);
    });
    return purchasesDTO;
}

export default {
    createPurchase,
    deletePurchase,
    getPurchase,
    updatePurchase,
    getTotalNumberOfPurchases,
    getPurchases,
};