const Inventory = require("../../model/Inventory");

const handleGetItem = async (req, res) => {
  const { itemId } = req.params;
  if (!itemId) return res.status(404).json({ message: "Item id needed" });
  const { inventory } = req.userObject;
  const item = inventory.find((item) => item.id === id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.status(200).json(item);
};
module.exports = handleGetItem;
