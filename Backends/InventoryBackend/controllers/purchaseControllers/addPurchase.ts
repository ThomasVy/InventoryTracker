import { Request, Response } from 'express';
import PurchaseModel, { IndividualPurchaseItem, PurchaseItemListZodSchema } from '../../model/PurchaseModel';
import { SendError } from '../../utils/ErrorHandling';
import { StatusError } from '../../types/error';

async function handleAddPurchases(req: Request, res: Response) {
    try {
        const purchaseOrder = PurchaseItemListZodSchema.parse(req.body.purchaseOrder);
        const { userId } = req;

        const items = purchaseOrder.map((item) => {
            return { id: item.id, quantity: item.quantity, price: item.price }
        });
        const createdItem = await PurchaseModel.create({ items, userId })
        if (!createdItem) {
            throw new StatusError("Could not create item", {statusCode: 500});
        }
        res.status(200).json({ message: "Successfully added purchase", purchaseId: createdItem.id });
    } catch (error) {
        SendError(res, error);
    }
}

export default handleAddPurchases;