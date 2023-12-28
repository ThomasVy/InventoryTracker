import { Request, Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import InventoryServices from "../../services/InventoryServices";

const handleUpdateInventoryItem = async (req: Request, res: Response) => {
    try {
        const { userId } = req;
        const updatedInventoryItem = await InventoryServices.updateInventoryItem(req.params.inventoryId, req.body.item, userId);
        res.status(200).json({ message: `Successfully updated purchase ${updatedInventoryItem.id}`, id: updatedInventoryItem.id });
    } catch (error) {
        SendError(res, error);
    }
};

export default handleUpdateInventoryItem;