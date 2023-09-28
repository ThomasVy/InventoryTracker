const Inventory = require('../../model/Inventory');

async function handleAddInventory  (req, res) {
    const {user} = req;
    const { name, stock, cost, reference } = req.body;
    if (!name || !stock || !cost || !user ) return res.status(400).json({ 'message': 'name, stock, cost, and user are required.' });
    let foundUser = await Inventory.findOne({user}).exec();
    if (!foundUser){
        foundUser = await Inventory.create({ user, inventory: [] });
    }

    foundUser.inventory.push({name, stock, cost, reference});
    const result = await foundUser.save();
    res.status(200).json({ 'success': `Inventory item added` });
}

module.exports = handleAddInventory;