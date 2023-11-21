const DEFAULT_LIMIT = 5;
const DEFAULT_PAGE = 0;

function paginationResultsForUser(attribute) {
    return async (req, res, next) => {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const results = { message: "" };
        if (isNaN(page) || page < 0) {
            console.log(`Not a valid page number or page number not supplied. Defaulting to ${DEFAULT_PAGE}\n`);
            page = DEFAULT_PAGE;
        }
        if (isNaN(limit)){
            console.log(`Not a valid limit. Defaulting to ${DEFAULT_LIMIT}\n`);
            limit = DEFAULT_LIMIT;
        }
        const selectedArray = req.userObject[attribute];
        if (!selectedArray) return res.status(204).json("No inventory items available");

        if (limit < 0) {
            limit = selectedArray.length;
        }
        const maxPage = Math.ceil(selectedArray.length / limit) - 1;
        if (page > maxPage) {
            console.log(`Page number (${page}) is greater than max page (${maxPage}). Defaulting page number to max page (${maxPage})\n`);
            page = maxPage;
        }
        results.page = page;
        results.limit = limit;
        results.totalItems = selectedArray.length;

        const startIndex = (page) * limit;
        const endIndex = (page+1) * limit;
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
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const results = { message: "" };
        if (isNaN(page) || page < 0) {
            console.log(`Not a valid page number or page number not supplied. Defaulting to ${DEFAULT_PAGE}\n`);
            page = DEFAULT_PAGE;
        }
        if (isNaN(limit)){
            console.log(`Not a valid limit. Defaulting to ${DEFAULT_LIMIT}\n`);
            limit = DEFAULT_LIMIT;
        }
        const {user} = req;
        const allItemsForThatUser = await model.find({user});
        if (limit < 0) {
            limit = allItemsForThatUser.length;
        }
        const maxPage = Math.ceil(allItemsForThatUser.length / limit) - 1;
        if (page > maxPage) {
            console.log(`Page number (${page}) is greater than max page (${maxPage}). Defaulting page number to max page (${maxPage})\n`);
            page = maxPage;
        }
        results.page = page;
        results.limit = limit;
        results.totalItems = allItemsForThatUser.length;

        const startIndex = (page) * limit;
        const endIndex = (page+1) * limit;
        if (endIndex < allItemsForThatUser.length) {
            results.nextPage = page + 1;
        }
        if (page !== maxPage) {
            results.maxPage = maxPage;
        }
        if (startIndex > 0 ){
            results.previousPage = page - 1;
        }
        results.results = allItemsForThatUser.slice(startIndex, endIndex);
        req.paginationResults = results;
        next();
    };
}

module.exports = {paginationResultsForUser, paginatedResults}