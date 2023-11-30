const PurchaseModel = require('../../model/PurchaseModel');

const handleAddPurchases = async (req, res) => {
    const {purchaseList} = req.body;
    const {user} = req;
    if (!purchaseList) {
        return res.status(403).json({message: "No purchase List was supplied"});
    }
    const items = purchaseList.map((item) => {
        return {id: item.id, quantity: item.quantity, price: item.price}
    });
    const createdItem = await PurchaseModel.create({ items, user })
    if(!createdItem) return res.status(500).json({message: "Could not create item"}); 
    res.status(200).json({message: "Successfully added purchase", purchaseId : createdItem._id});
}

module.exports = handleAddPurchases