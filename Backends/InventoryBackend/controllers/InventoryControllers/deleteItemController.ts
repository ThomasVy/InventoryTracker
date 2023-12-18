import { Response, Request } from 'express';
import InventoryModel from '../../model/InventoryModel';
import { SendError } from '../../utils/ErrorHandling';
import { StatusError } from '../../types/error';

const handleDeleteItem = async (req : Request, res : Response) => {
    try {
        const itemId = parseInt(req.params.itemId);
        if (isNaN(itemId)) {
            throw new StatusError("item id not supplied as a number", {statusCode: 403});
        }
        const {userId} = req;
        await InventoryModel.deleteOne({userId, id: itemId});
        return res.sendStatus(200);
    } catch (error) {
        SendError(res, error);
    }
}
export default handleDeleteItem;