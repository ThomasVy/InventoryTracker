const express = require("express")
const router = express.Router()
const {paginatedResults} = require('../middleware/pagination');
const PurchaseModel = require("../model/PurchaseModel");

router.post("/", require('../controllers/purchaseControllers/addPurchase'));
router.get("/", paginatedResults(PurchaseModel), require('../controllers/purchaseControllers/listPurchases'));
module.exports = router;