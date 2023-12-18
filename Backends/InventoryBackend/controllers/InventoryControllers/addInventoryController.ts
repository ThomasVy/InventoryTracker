import Inventory, { InventoryTypeExternal, InventoryZodExternal } from '../../model/InventoryModel';
import { Response, Request } from "express";
import { StatusError } from '../../types/error';
import { SendError } from '../../utils/ErrorHandling';
import { ZodError, z } from 'zod';



async function handleAddInventory(req: Request<unknown, unknown, InventoryTypeExternal>, res: Response) {
    try {
        const { userId } = req;
        const { name, stock, cost, reference, type, owner } = InventoryZodExternal.parse(req.body);
        const item = await Inventory.create({ userId, name, stock, cost, type, reference, owner });
        if (!item) {
            throw new StatusError("couldn't create item", { statusCode: 500 });
        }
        res.status(200).json({ message: `Inventory item added` });
    } catch (error) {
        SendError(res, error)
    }
}

export default handleAddInventory;