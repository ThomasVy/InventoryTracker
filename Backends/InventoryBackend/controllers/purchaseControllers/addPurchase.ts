import { Request, Response } from 'express';
import { SendError } from '../../utils/ErrorHandling';
import PurchaseServices from '../../services/PurchaseServices';

async function handleAddPurchases(req: Request, res: Response) {
    try {
        const { userId } = req;
        const createdPurchase = await PurchaseServices.createPurchase({items: req.body.purchaseOrder}, userId);
        res.status(200).json({ message: "Successfully added purchase", purchaseId: createdPurchase.id });
    } catch (error) {
        SendError(res, error);
    }
}

export default handleAddPurchases;