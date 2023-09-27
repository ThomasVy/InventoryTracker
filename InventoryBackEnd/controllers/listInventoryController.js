const Inventory = require('../model/Inventory');

const handleListInventory = async (req, res) => {
    const dbItems = await Inventory.find({})
    res.status(200).json(dbItems);
}

module.exports = handleListInventory