const Inventory = require('../../model/Inventory');

const handleDeleteItem = async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    if (isNaN(itemId)) return res.sendStatus(404);

    const newInventory = req.userObject.inventory.filter(item=> {
        return item.itemId !== itemId;
    });
    if (newInventory.length === 0) {
        console.log("Empty inventory - deleting entry from DB")
        await req.userObject.deleteOne();
        return res.sendStatus(200);
    }
    req.userObject.inventory = newInventory;
    const result = await req.userObject.save();
    return res.sendStatus(200);
}
module.exports = handleDeleteItem;