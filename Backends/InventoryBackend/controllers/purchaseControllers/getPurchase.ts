import { Request, Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import { StatusError } from "../../types/error";
import PurchaseModel, { PurchaseItemListZodSchema } from "../../model/PurchaseModel";
import IdParser from "../../utils/IdParse";

const handleGetPurchaseOrder = async (req: Request, res: Response) => {
    try {
        const id = IdParser.parse(req.params.purchaseId);

        const { userId } = req;
        const purchaseOrder = await PurchaseModel.findOne({id, userId });
        if (!purchaseOrder) {
            throw new StatusError(`No order with id ${id} exists`, {statusCode: 404});
        }
        const results = {
            id,
            date: purchaseOrder.date,
            items: PurchaseItemListZodSchema.parse(purchaseOrder.items)
        }
        res.status(200).json(results);
    } catch (error) {
        SendError(res, error);
    }
};

export default handleGetPurchaseOrder;