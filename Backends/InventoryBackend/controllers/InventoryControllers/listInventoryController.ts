import { Response } from "express";
import { PaginationRequest } from "../../types/paginationTypes";
import { InventoryType } from "../../model/InventoryModel";

const handleListInventory = (req : PaginationRequest<InventoryType>, res: Response) => {
    console.log(req.paginationResults);
    res.status(200).json(req.paginationResults);
}

export default handleListInventory