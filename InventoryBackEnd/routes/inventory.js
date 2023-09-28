const express = require("express")
const router = express.Router()

router.get("/", require('../controllers/InventoryControllers/listInventoryController'));
router.delete("/:itemId", require('../controllers/InventoryControllers/deleteItemController'));
router.post("/add", require('../controllers/InventoryControllers/addInventoryController'));
module.exports = router;