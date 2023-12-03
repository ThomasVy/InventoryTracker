import Inventory, {InventoryType} from '../../model/InventoryModel';
import { Response, Request } from "express";
import { StatusError } from '../../types/error';
import { SendError } from '../../utils/ErrorHandling';

type InterfaceAdd = Omit<InventoryType, "userId">; 

async function handleAddInventory (req : Request<unknown, unknown, InterfaceAdd>, res: Response) {
    try {
        const {userId} = req;
        const { name, stock, cost, reference, type, owner } = req.body;
        if (!name || !stock || !cost ||!type || !userId || !owner ) {
            throw new StatusError("name, stock, cost, type, and user are required.", {statusCode: 403});
        }
        const item = await Inventory.create({userId, name, stock, cost, type, reference, owner});
        if (!item) {
            throw new StatusError("couldn't create item", {statusCode: 500});
        }
        res.status(200).json({ message: `Inventory item added` });
    } catch (error) {
        SendError(res, error)
    }
}

export default handleAddInventory;