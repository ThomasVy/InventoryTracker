import express from "express";
import addPurchaseController from '../controllers/purchaseControllers/addPurchase';
import listPurchasesController from '../controllers/purchaseControllers/listPurchases'
import getPurchaseController from '../controllers/purchaseControllers/getPurchase'
import handleUpdatePurchase from "../controllers/purchaseControllers/updatePurchase";
import handleDeletePurchase from "../controllers/purchaseControllers/deletePurchase";
import { PURCHASE_ID_PARAM } from "../types/purchasesTypes";


const router = express.Router();

router.post("/", addPurchaseController);
router.get("/", listPurchasesController);

router.get(`/:${PURCHASE_ID_PARAM}`, getPurchaseController);
router.put(`/:${PURCHASE_ID_PARAM}`, handleUpdatePurchase);
router.delete(`/:${PURCHASE_ID_PARAM}`, handleDeletePurchase);

export default router;