import { Response } from "express";
import { PaginationRequest } from "../../types/paginationTypes";
import { pagination } from "../../middleware/pagination";
import { SendError } from "../../utils/ErrorHandling";
import InventoryServices from "../../services/InventoryServices";
import { InventoryDTO } from "../../model/InventoryModel";

const handleListInventory = async (req: PaginationRequest<InventoryDTO>, res: Response) => {
    try {
        const { userId } = req;
        const results = await pagination({
              userId,
              paginationQuery: req.query,
              getTotal: InventoryServices.getNumberOfInventoryItem,
              getItems: InventoryServices.getInventory
           });
     
        res.status(200).json(results);
     } catch (error) {
        SendError(res, error);
     }
}

export default handleListInventory