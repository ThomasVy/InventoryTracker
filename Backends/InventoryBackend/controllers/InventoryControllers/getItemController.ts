import { Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import InventoryServices from "../../services/InventoryServices";
import { InventoryIdRequest } from "../../types/inventoryTypes.";

const handleGetItem = async (req: InventoryIdRequest, res: Response) => {
  try {
    const {userId} = req;
    const item = await InventoryServices.getInventoryItem(req.params.inventoryId, userId);
    res.status(200).json(item);
  } catch (error) {
    SendError(res, error);
  }
};
export default handleGetItem;
