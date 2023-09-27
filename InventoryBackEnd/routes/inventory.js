const express = require("express")
const router = express.Router()

router.get("/", require('../controllers/listInventoryController'));
router.post("/add", require('../controllers/addInventoryController'));
module.exports = router;