import { Request, Response } from "express";
import { SendError } from "../../utils/ErrorHandling";
import { StatusError } from "../../types/error";
import InventoryModel from "../../model/InventoryModel";

const handleGetItem = async (req: Request, res: Response) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const {userId} = req;
    if (!itemId) {
      throw new StatusError("Item id was not supplied as a number", {statusCode: 403});
    }
    const foundItem = await InventoryModel.findOne({userId});
    if (!foundItem) {
      throw new StatusError("Item didn't exist", {statusCode: 404});
    }
    
    res.status(200).json(foundItem);
  } catch (error) {
    SendError(res, error);
  }
};
export default handleGetItem;
