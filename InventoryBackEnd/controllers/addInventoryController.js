const Inventory = require('../model/Inventory');

async function handleAddInventory  (req, res) {
    const { name, stock, cost, reference } = req.body;
    if (!name || !stock || !cost ) return res.status(400).json({ 'message': 'name, stock, and cost are required.' });
    try {
        const result = await Inventory.create({
            name, stock, cost, reference
        });
        res.status(200).json({ 'success': `New user ${name} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = handleAddInventory;