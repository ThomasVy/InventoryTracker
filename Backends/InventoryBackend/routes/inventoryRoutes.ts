import express from "express";
import deleteInventoryController from '../controllers/InventoryControllers/deleteItemController';
import addInventoryController from '../controllers/InventoryControllers/addInventoryController';
import getInventoryItemController from '../controllers/InventoryControllers/getItemController';
import handleUpdateInventoryItem from "../controllers/InventoryControllers/updateInventoryItem";
import listInventoryController from "../controllers/InventoryControllers/listInventoryController";
import { INVENTORY_ID_PARAM, INVENTORY_TAG_PARAM } from "../types/inventoryTypes.";
import handleGetItemByTag from "../controllers/InventoryControllers/getItemByTagController";

const router = express.Router()

router.get("/", listInventoryController);
router.post("/add", addInventoryController);

router.delete(`/:${INVENTORY_ID_PARAM}`, deleteInventoryController);
router.put(`/:${INVENTORY_ID_PARAM}`, handleUpdateInventoryItem);
router.get(`/:${INVENTORY_ID_PARAM}`, getInventoryItemController);
router.get(`/tag/:${INVENTORY_TAG_PARAM}`, handleGetItemByTag);
export default router;