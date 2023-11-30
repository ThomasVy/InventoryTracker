const handleListPurchases = (req, res) => {
  const orders = req.paginationResults.results.map((order) => {
    return {
      id: order._id
    };
  });
  req.paginationResults.results = orders;
  res.status(200).json(req.paginationResults);
};

module.exports = handleListPurchases;
