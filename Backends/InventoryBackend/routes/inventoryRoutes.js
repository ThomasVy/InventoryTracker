const express = require("express")
const router = express.Router()
const Inventory = require('../model/InventoryModel');
const {paginationResultsForUser} = require('../middleware/pagination');
const getUserObjectFromModel = require("../middleware/getUserObjectFromModel");

const getUserObjectFromInventory = getUserObjectFromModel(Inventory);

router.get("/", getUserObjectFromInventory, paginationResultsForUser("inventory"), require('../controllers/InventoryControllers/listInventoryController'));
router.delete("/:itemId", getUserObjectFromInventory, require('../controllers/InventoryControllers/deleteItemController'));
router.post("/add", require('../controllers/InventoryControllers/addInventoryController'));
router.get("/:itemId", getUserObjectFromInventory, require('../controllers/InventoryControllers/getItemController'))
module.exports = router;