const express = require("express")
const router = express.Router()
const Inventory = require('../model/Inventory');
const {paginationResultsForUser} = require('../middleware/pagination')

router.get("/", paginationResultsForUser(Inventory, "inventory"), require('../controllers/InventoryControllers/listInventoryController'));
router.delete("/:itemId", require('../controllers/InventoryControllers/deleteItemController'));
router.post("/add", require('../controllers/InventoryControllers/addInventoryController'));
module.exports = router;