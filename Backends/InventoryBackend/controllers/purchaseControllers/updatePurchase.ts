import { Request, Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import PurchaseServices from "../../services/PurchaseServices";

const handleUpdatePurchase = async (req: Request, res: Response) => {
    try {
        const { userId } = req;
        const updatedPurchase = await PurchaseServices.updatePurchase(req.params.purchaseId, req.body.purchaseOrder, userId);
        res.status(200).json({ message: `Successfully updated purchase ${updatedPurchase.id}`, purchaseId: updatedPurchase.id });
    } catch (error) {
        SendError(res, error);
    }
};

export default handleUpdatePurchase;