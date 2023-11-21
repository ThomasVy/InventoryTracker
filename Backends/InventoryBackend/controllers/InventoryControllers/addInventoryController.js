const Inventory = require('../../model/InventoryModel');

async function handleAddInventory  (req, res) {
    const {user} = req;
    const { name, stock, cost, reference, type, owner } = req.body;
    if (!name || !stock || !cost ||!type || !user || !owner ) return res.status(400).json({ 'message': 'name, stock, cost, type, and user are required.' });
    let foundUser = await Inventory.findOne({user}).exec();
    if (!foundUser){
        foundUser = await Inventory.create({ user, inventory: [] });
    }
    let itemId = foundUser.inventory.at(-1)?.itemId || 0;
    itemId++;
    
    foundUser.inventory.push({itemId, name, stock, cost, type, reference, owner});
    const result = await foundUser.save();
    res.status(200).json({ 'success': `Inventory item added` });
}

module.exports = handleAddInventory;