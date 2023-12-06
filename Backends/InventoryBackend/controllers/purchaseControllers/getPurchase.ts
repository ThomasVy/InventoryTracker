import { Request, Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import { StatusError } from "../../types/error";
import PurchaseModel from "../../model/PurchaseModel";

const handleGetPurchaseOrder = async (req: Request, res: Response) => {
    try {
        const purchaseId = parseInt(req.params.purchaseId);

        const { userId } = req;
        if (!purchaseId) {
            throw new StatusError("No item id was supplied", {statusCode: 404});
        }
        const purchaseOrder = await PurchaseModel.findOne({id: purchaseId, userId });
        if (!purchaseOrder) {
            throw new StatusError(`No order with id ${purchaseId} exists`, {statusCode: 404});
        }
        const results = {
            id: purchaseId,
            date: purchaseOrder.date,
            items: purchaseOrder.items.map((item) => {
                return {
                  price: item.price,
                  id: item.id,
                  quantity: item.quantity,
                };
              })
        }
        res.status(200).json(results);
    } catch (error) {
        SendError(res, error);
    }
};

export default handleGetPurchaseOrder;