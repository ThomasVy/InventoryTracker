import { Response } from "express";
import { PaginationRequest, SearchPayload } from "../../types/paginationTypes";
import { pagination } from "../../middleware/pagination";
import { SendError } from "../../utils/ErrorHandling";
import InventoryServices from "../../services/InventoryServices";
import { InventoryDTO } from "../../model/InventoryModel";

const handleListInventory = async (req: PaginationRequest<InventoryDTO, SearchPayload>, res: Response) => {
    try {
        const { userId } = req;
        const results = await pagination({
              userId,
              paginationQuery: req.query,
              getTotal: InventoryServices.getNumberOfInventoryItem(req.query.payload?.search),
              getItems: InventoryServices.getInventory(req.query.payload?.search)
           });
     
        res.status(200).json(results);
     } catch (error) {
        SendError(res, error);
     }
}

export default handleListInventory