import { Response, Request } from 'express';
import { SendError } from '../../utils/ErrorHandling';
import InventoryServices from '../../services/InventoryServices';
import { InventoryIdRequest } from '../../types/inventoryTypes.';

const handleDeleteItem = async (req : InventoryIdRequest, res : Response) => {
    try {
        const {userId} = req;
        await InventoryServices.deleteInventoryItem(req.params.inventoryId, userId);
        return res.sendStatus(200);
    } catch (error) {
        SendError(res, error);
    }
}
export default handleDeleteItem;