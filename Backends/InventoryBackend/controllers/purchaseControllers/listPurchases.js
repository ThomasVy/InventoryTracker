const moment = require('moment-timezone');

const handleListPurchases = (req, res) => {
  const orders = req.paginationResults.results.map((order) => {
    return {
      id: order._id,
      date: moment(order.date),
      items: order.items.map((item) => {
        return {
          individualPrice: item.individualPrice,
          itemId: item.itemId,
          quantity: item.quantity,
        };
      }),
    };
  });
  req.paginationResults.results = orders;
  res.status(200).json(req.paginationResults);
};

module.exports = handleListPurchases;
