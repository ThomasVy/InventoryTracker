const PurchaseModel = require("../../model/PurchaseModel");

const handleGetPurchaseOrder = async (req, res) => {
    try {
        const purchaseId = parseInt(req.params.purchaseId);
        const { user } = req;
        if (!user) throw new Error("No user given");
        if (!purchaseId) throw new Error("No item id was supplied");
        const purchaseOrder = await PurchaseModel.findOne({_id: purchaseId, user });
        if (!purchaseOrder) throw new Error(`No order with id ${purchaseId} exists`)
        const results = {
            id: purchaseId,
            date: purchaseOrder.date,
            items: purchaseOrder.items.map((item) => {
                return {
                  price: item.price,
                  id: item.id,
                  quantity: item.quantity,
                };
              })
        }
        res.status(200).json(results);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
};
module.exports = handleGetPurchaseOrder;