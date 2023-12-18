import { Response, Request } from 'express';
import { SendError } from '../../utils/ErrorHandling';
import PurchaseModel from '../../model/PurchaseModel';
import IdParser from '../../utils/IdParse';

const handleDeletePurchase = async (req : Request, res : Response) => {
    try {
        const id = IdParser.parse(req.params.purchaseId)
        const { userId } = req;
        await PurchaseModel.deleteOne({id, userId})
        return res.sendStatus(200);
    } catch (error) {
        SendError(res, error);
    }
}
export default handleDeletePurchase;