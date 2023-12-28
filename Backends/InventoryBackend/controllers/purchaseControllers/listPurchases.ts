import { Response } from "express";
import { pagination } from "../../middleware/pagination";
import { PaginationRequest } from "../../types/paginationTypes";
import { PurchaseDTO } from "../../model/PurchaseModel";
import PurchaseServices from "../../services/PurchaseServices";
import { SendError } from "../../utils/ErrorHandling";

const handleListPurchases = async (req: PaginationRequest<PurchaseDTO>, res: Response) => {
   try {
      const { userId } = req;
      const results = await pagination({
            userId,
            paginationQuery: req.query,
            getTotal: PurchaseServices.getTotalNumberOfPurchases,
            getItems: PurchaseServices.getPurchases
         });
   
      res.status(200).json(results);
   } catch (error) {
      SendError(res, error);
   }
};

export default handleListPurchases;
