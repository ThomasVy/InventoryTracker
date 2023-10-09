const DEFAULT_LIMIT = 5;
const DEFAULT_PAGE = 1;

function paginationResultsForUser(model, attribute) {
    return async (req, res, next) => {
        if (!req.user) return res.sendStatus(403);
        const {user} = req;
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const results = { message: "" };
        const foundUser = await model.findOne({user});
        if (!foundUser) {
            results.message += "No collection was found.\n";
            return res.status(201).json();    
        }
        if (isNaN(page) || page <= 0) {
            results.message += `Not a valid page number or page number not supplied. Defaulting to ${DEFAULT_PAGE}\n`;
            page = DEFAULT_PAGE;
        }
        if (isNaN(limit)){
            results.message += `Not a valid limit. Defaulting to ${DEFAULT_LIMIT}\n`;
            limit = DEFAULT_LIMIT;
        }
        const inventoryItems = foundUser[attribute];
        
        if (limit < 0) {
            limit = inventoryItems.length;
        }
        const maxPage = Math.ceil(inventoryItems.length / limit);
        if (page > maxPage) {
            results.message += `Page number (${page}) is greater than max page (${maxPage}). Defaulting page number to max page (${maxPage})\n`;
            page = maxPage;
        }
        results.page = page;
        results.limit = limit;
        results.totalItems = inventoryItems.length;

        const startIndex = (page - 1) * limit;
        const endIndex = (page) * limit;
        
        if (endIndex < inventoryItems.length) {
            results.nextPage = page + 1;
        }
        if (page !== maxPage) {
            results.maxPage = maxPage;
        }
        if (startIndex > 0 ){
            results.previousPage = page - 1;
        }
        results.results = inventoryItems.slice(startIndex, endIndex);
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