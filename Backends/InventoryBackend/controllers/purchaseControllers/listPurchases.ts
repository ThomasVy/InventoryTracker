import { Response } from "express";
import { pagination } from "../../middleware/pagination";
import { PaginationRequest, SearchPayload } from "../../types/paginationTypes";
import { PurchaseDTO, PurchaseDTOMini } from "../../model/PurchaseModel";
import PurchaseServices from "../../services/PurchaseServices";
import { SendError } from "../../utils/ErrorHandling";
import { StatusError } from "../../types/error";

type ItemPayload = {
   itemId: string
};

function isSearchPayload(obj: any): obj is SearchPayload {
   return obj?.search !== undefined
}

function isItemPayload(obj: any): obj is ItemPayload {
   return obj?.itemId !== undefined
}

const handleListPurchases = async (req: PaginationRequest<PurchaseDTO, SearchPayload | ItemPayload>, res: Response) => {
   try {
      const { userId } = req;
      if (isSearchPayload(req.query.payload)) {
         const results = await pagination<PurchaseDTOMini>({
            userId,
            paginationQuery: req.query,
            getTotal: PurchaseServices.getTotalNumberOfPurchases(req.query.payload.search),
            getItems: PurchaseServices.getPurchases(req.query.payload.search)
         });

         res.status(200).json(results);
      }
      else if(isItemPayload(req.query.payload)){
         const results = await pagination<PurchaseDTOMini>({
            userId,
            paginationQuery: req.query,
            getTotal: PurchaseServices.getTotalPurchasesWithContainingItem(req.query.payload.itemId),
            getItems: PurchaseServices.getPurchaseContainingItem(req.query.payload.itemId)
         });

         res.status(200).json(results);
      }
      else {
         throw new StatusError("Unknown payload", {statusCode: 403});
      }
   } catch (error) {
      SendError(res, error);
   }
};

export default handleListPurchases;
