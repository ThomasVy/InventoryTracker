import { Request, Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import { StatusError } from "../../types/error";
import PurchaseModel, { PurchaseExternalZodSchema } from "../../model/PurchaseModel";
import IdParser from "../../utils/IdParse";

const handleUpdatePurchase = async (req: Request, res: Response) => {
    try {
        const id = IdParser.parse(req.params.purchaseId);
        const { userId } = req;
        const sentPurchaseOrder = PurchaseExternalZodSchema.parse(req.body.purchaseOrder);
        const purchaseOrder = await PurchaseModel.findOne({id, userId });
        if (!purchaseOrder) {
            throw new StatusError(`No order with id ${id} exists`, {statusCode: 404});
        }
        
        purchaseOrder.date = sentPurchaseOrder.date;
        purchaseOrder.items = sentPurchaseOrder.items;
        await purchaseOrder.save();
        res.status(200).json({ message: `Successfully updated purchase ${id}`, purchaseId: id });
    } catch (error) {
        SendError(res, error);
    }
};

export default handleUpdatePurchase;