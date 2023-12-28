import { Request, Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import PurchaseServices from "../../services/PurchaseServices";

const handleGetPurchaseOrder = async (req: Request, res: Response) => {
    try {
        const { userId } = req;
        const purchase = await PurchaseServices.getPurchase(req.params.purchaseId, userId);
        res.status(200).json(purchase);
    } catch (error) {
        SendError(res, error);
    }
};

export default handleGetPurchaseOrder;