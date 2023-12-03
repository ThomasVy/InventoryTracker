import { Request, Response } from 'express';
import PurchaseModel, { IndividualPurchaseItem } from '../../model/PurchaseModel';
import { SendError } from '../../utils/ErrorHandling';
import { StatusError } from '../../types/error';

interface RequestBody {
    purchaseList: IndividualPurchaseItem[]
}

async function handleAddPurchases(req: Request<unknown, unknown, RequestBody, unknown>, res: Response) {
    try {
        const { purchaseList } = req.body;
        const { userId } = req;

        if (!purchaseList) {
            throw new StatusError("No purchase List was supplied", {statusCode: 404});
        }
        const items = purchaseList.map((item) => {
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