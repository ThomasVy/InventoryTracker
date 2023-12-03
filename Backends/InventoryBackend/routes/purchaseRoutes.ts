import express from "express";
import { paginatedResults } from '../middleware/pagination';
import PurchaseModel from "../model/PurchaseModel";
import addPurchaseController from '../controllers/purchaseControllers/addPurchase';
import listPurchasesController from '../controllers/purchaseControllers/listPurchases'
import getPurchaseController from '../controllers/purchaseControllers/getPurchase'
const router = express.Router();

router.post("/", addPurchaseController);
router.get("/", paginatedResults(PurchaseModel), listPurchasesController);
router.get("/:purchaseId", getPurchaseController);
export default router;