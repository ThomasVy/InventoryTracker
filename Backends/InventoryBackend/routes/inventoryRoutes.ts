import express from "express";
import { paginatedResults } from "../middleware/pagination";
import InventoryModel from "../model/InventoryModel";
import listInventoryController from '../controllers/InventoryControllers/listInventoryController';
import deleteInventoryController from '../controllers/InventoryControllers/deleteItemController';
import addInventoryController from '../controllers/InventoryControllers/addInventoryController';
import getInventoryItemController from '../controllers/InventoryControllers/getItemController';
import handleUpdateInventoryItem from "../controllers/InventoryControllers/updateInventoryItem";
const router = express.Router()

router.get("/", paginatedResults(InventoryModel), listInventoryController);
router.post("/add", addInventoryController);

router.delete("/:itemId", deleteInventoryController);
router.put("/:itemId", handleUpdateInventoryItem);
router.get("/:itemId", getInventoryItemController);

export default router;