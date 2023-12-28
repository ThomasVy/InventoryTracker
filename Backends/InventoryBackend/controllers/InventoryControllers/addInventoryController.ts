import { Response, Request } from "express";
import { SendError } from '../../utils/ErrorHandling';
import InventoryServices from '../../services/InventoryServices';

async function handleAddInventory(req: Request, res: Response) {
    try {
        const { userId } = req;
        const createdItem = await InventoryServices.createInventoryItem(req.body, userId);
        res.status(200).json({ message: `Inventory item added`, id: createdItem.id });
    } catch (error) {
        SendError(res, error)
    }
}

export default handleAddInventory;