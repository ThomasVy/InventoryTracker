import { Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import InventoryServices from "../../services/InventoryServices";
import { InventoryTagRequest } from "../../types/inventoryTypes.";

const handleGetItemByTag = async (req: InventoryTagRequest, res: Response) => {
  try {
    const {userId} = req;
    const item = await InventoryServices.getInventoryItemByTag(req.params.tag, userId);
    res.status(200).json(item);
  } catch (error) {
    SendError(res, error);
  }
};
export default handleGetItemByTag;
