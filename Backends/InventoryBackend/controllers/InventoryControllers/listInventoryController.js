const handleListInventory = (req, res) => {
    res.status(200).json(req.paginationResults);
}

module.exports = handleListInventory