const Inventory = require("../../model/Inventory");

const handleGetItem = async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  if (!itemId) return res.status(204).json({ message: "Item id needed" });
  const { inventory } = req.userObject;
  const item = inventory.find((item) => item.itemId === itemId);
  if (!item) return res.status(204).json({ message: "Item not found" });
  res.status(200).json(item);
};
module.exports = handleGetItem;
