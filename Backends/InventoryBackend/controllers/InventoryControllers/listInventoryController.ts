import { Response } from "express";
import { PaginationRequest } from "../../types/paginationTypes";
import { InventoryTypeInternal } from "../../model/InventoryModel";

const handleListInventory = (req : PaginationRequest<InventoryTypeInternal>, res: Response) => {
    res.status(200).json(req.paginationResults);
}

export default handleListInventory