import express from "express";
import { paginatedResults, searchTerm } from '../middleware/pagination';
import PurchaseModel from "../model/PurchaseModel";
import addPurchaseController from '../controllers/purchaseControllers/addPurchase';
import listPurchasesController from '../controllers/purchaseControllers/listPurchases'
import getPurchaseController from '../controllers/purchaseControllers/getPurchase'
import handleUpdatePurchase from "../controllers/purchaseControllers/updatePurchase";
import handleDeletePurchase from "../controllers/purchaseControllers/deletePurchase";
const router = express.Router();

router.post("/", addPurchaseController);
router.get("/", searchTerm(PurchaseModel, "userId"), listPurchasesController);

router.get("/:purchaseId", getPurchaseController);
router.put("/:purchaseId", handleUpdatePurchase);
router.delete("/:purchaseId", handleDeletePurchase);

export default router;