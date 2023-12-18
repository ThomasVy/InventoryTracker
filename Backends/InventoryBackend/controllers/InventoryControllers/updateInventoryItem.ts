import { Request, Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import { StatusError } from "../../types/error";
import IdParser from "../../utils/IdParse";
import InventoryModel, { InventoryZodExternal } from "../../model/InventoryModel";

const handleUpdateInventoryItem = async (req: Request, res: Response) => {
    try {
        const itemId = IdParser.parse(req.params.itemId);
        const { userId } = req;
        const sentInventoryItem = InventoryZodExternal.parse(req.body.item);
        const savedItem = await InventoryModel.findOneAndUpdate({userId, id: itemId},sentInventoryItem);
        if (!savedItem) {
            throw new StatusError(`No order with id ${itemId} exists`, {statusCode: 404});
        }
        
        res.status(200).json({ message: `Successfully updated purchase ${itemId}`, itemId });
    } catch (error) {
        SendError(res, error);
    }
};

export default handleUpdateInventoryItem;