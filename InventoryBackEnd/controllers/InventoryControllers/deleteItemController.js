const Inventory = require('../../model/Inventory');

const handleDeleteItem = async (req, res) => {
    const {user} = req;
    const {itemId} = req.params;
    if (!user || !itemId) return res.sendStatus(403);

    const usersInventory = await Inventory.findOne({user});
    if (!usersInventory) return res.sendStatus(404);
    const newInventory = usersInventory.inventory.filter(item=> {
        return item._id.toString() !== itemId;
    });
    if (newInventory.length === 0) {
        console.log("Empty inventory - deleting entry from DB")
        await usersInventory.deleteOne();
        return res.sendStatus(200);
    }
    usersInventory.inventory = newInventory;
    const result = await usersInventory.save();
    return res.sendStatus(200);
}
module.exports = handleDeleteItem;