const DEFAULT_LIMIT = 5;
const DEFAULT_PAGE = 1;

function paginationResultsForUser(attribute) {
    return async (req, res, next) => {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const results = { message: "" };
        if (isNaN(page) || page <= 0) {
            results.message += `Not a valid page number or page number not supplied. Defaulting to ${DEFAULT_PAGE}\n`;
            page = DEFAULT_PAGE;
        }
        if (isNaN(limit)){
            results.message += `Not a valid limit. Defaulting to ${DEFAULT_LIMIT}\n`;
            limit = DEFAULT_LIMIT;
        }
        const selectedArray = req.userObject[attribute];
        if (!selectedArray) return res.status(204).json("No inventory items available");

        if (limit < 0) {
            limit = selectedArray.length;
        }
        const maxPage = Math.ceil(selectedArray.length / limit);
        if (page > maxPage) {
            results.message += `Page number (${page}) is greater than max page (${maxPage}). Defaulting page number to max page (${maxPage})\n`;
            page = maxPage;
        }
        results.page = page;
        results.limit = limit;
        results.totalItems = selectedArray.length;

        const startIndex = (page - 1) * limit;
        const endIndex = (page) * limit;
        
        if (endIndex < selectedArray.length) {
            results.nextPage = page + 1;
        }
        if (page !== maxPage) {
            results.maxPage = maxPage;
        }
        if (startIndex > 0 ){
            results.previousPage = page - 1;
        }
        results.results = selectedArray.slice(startIndex, endIndex).map(item => item.itemId);
        req.paginationResults = results;
        next();
    };
}

function paginatedResults(model) {
    return async (req, res, next) => {
        if (!req.user || !req.query.page || !req.query.limit) return res.sendStatus(403);
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = (page) * limit;
    
        const results = {};
    
        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }
        if (startIndex > 0 ){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec();
            req.paginationResults = results;
            next();
        } catch (error) {
            res.status(500).json({message: e.message});
        }
    };
}

module.exports = {paginationResultsForUser}