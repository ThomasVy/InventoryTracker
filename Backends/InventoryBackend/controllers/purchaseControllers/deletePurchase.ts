import { Response, Request } from 'express';
import { SendError } from '../../utils/ErrorHandling';
import PurchaseServices from '../../services/PurchaseServices';
const handleDeletePurchase = async (req : Request, res : Response) => {
    try {
        const { userId } = req;
        await PurchaseServices.deletePurchase(req.params.purchaseId, userId);
        return res.sendStatus(200);
    } catch (error) {
        SendError(res, error);
    }
}
export default handleDeletePurchase;