import { Request, Response } from "express";
import { PaginationRequest } from "../../types/paginationTypes";
import { PurchaseType } from "../../model/PurchaseModel";

const handleListPurchases = (req: PaginationRequest<PurchaseType>, res: Response) => {
   res.status(200).json(req.paginationResults);
};

export default handleListPurchases;
