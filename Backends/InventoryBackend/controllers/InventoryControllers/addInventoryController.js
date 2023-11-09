const Inventory = require('../../model/Inventory');

async function handleAddInventory  (req, res) {
    const {user} = req;
    const { name, stock, cost, reference, type } = req.body;
    if (!name || !stock || !cost ||!type || !user ) return res.status(400).json({ 'message': 'name, stock, cost, type, and user are required.' });
    let foundUser = await Inventory.findOne({user}).exec();
    if (!foundUser){
        foundUser = await Inventory.create({ user, inventory: [] });
    }
    let itemId = foundUser.inventory.at(-1)?.itemId || 0;
    itemId++;
    
    foundUser.inventory.push({itemId, name, stock, cost, type, reference});
    const result = await foundUser.save();
    res.status(200).json({ 'success': `Inventory item added` });
}

module.exports = handleAddInventory;