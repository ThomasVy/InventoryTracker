import { Request, Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import { StatusError } from "../../types/error";
import PurchaseModel, { PurchaseExternalZodSchema } from "../../model/PurchaseModel";
import { ZodError } from "zod";

const handleUpdatePurchase = async (req: Request, res: Response) => {
    try {
        const purchaseId = parseInt(req.params.purchaseId);
        const { userId } = req;
        if (!purchaseId) {
            throw new StatusError("No item id was supplied", {statusCode: 404});
        }
        const parsedPurchaseOrder = PurchaseExternalZodSchema.parse(req.body.purchaseOrder);
        const purchaseOrder = await PurchaseModel.findOne({id: purchaseId, userId });
        if (!purchaseOrder) {
            throw new StatusError(`No order with id ${purchaseId} exists`, {statusCode: 404});
        }
        if (parsedPurchaseOrder.items.length == 0) {
            throw new StatusError("Cannot update order with no items", {statusCode: 403});
        }
        
        purchaseOrder.date = parsedPurchaseOrder.date;
        purchaseOrder.items = parsedPurchaseOrder.items;
        await purchaseOrder.save();
        res.status(200).json({ message: `Successfully updated purchase ${purchaseId}`, purchaseId });
    } catch (error) {
        if (error instanceof ZodError) {
            error = new StatusError(error.message, { statusCode: 403 });
        }
        SendError(res, error);
    }
};

export default handleUpdatePurchase;