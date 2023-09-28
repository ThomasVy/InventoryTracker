const Inventory = require('../../model/Inventory');

const handleListInventory = async (req, res) => {
    const {user} = req;
    if (!user) return res.sendStatus(403);

    const usersInventory = await Inventory.findOne({user});
    if (!usersInventory) return res.sendStatus(204); 
    res.status(200).json(usersInventory.inventory);
}

module.exports = handleListInventory