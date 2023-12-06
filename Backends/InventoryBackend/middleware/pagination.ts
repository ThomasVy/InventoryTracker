import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { SendError } from "../utils/ErrorHandling";
import { StatusError } from "../types/error";
import { PaginationRequest, PaginationResults } from "../types/paginationTypes";
import { clearLine } from "readline";

const DEFAULT_LIMIT = 5;
const DEFAULT_PAGE = 0;

export function paginatedResults<T>(model : Model<T>) {
    return async (req: PaginationRequest<T>, res: Response, next: NextFunction) => {
        try {
            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);
            if (isNaN(page) || page < 0) {
                console.log(`Not a valid page number or page number not supplied. Defaulting to ${DEFAULT_PAGE}\n`);
                page = DEFAULT_PAGE;
            }
            if (isNaN(limit) || limit < -1){
                console.log(`Not a valid limit. Defaulting to ${DEFAULT_LIMIT}\n`);
                limit = DEFAULT_LIMIT;
            }
            const {userId} = req;
            const totalNumberOfItems = await model.countDocuments({userId});
            const maxPage = Math.ceil(totalNumberOfItems / limit) - 1;
            if (page > maxPage) {
                console.log(`Page number (${page}) is greater than max page (${maxPage}).
                     Defaulting page number to max page (${maxPage})\n`);
                page = maxPage;
            }
            const findPromise = model.find({userId});
            if (limit !== -1) {
                findPromise.limit(limit).skip(page * limit);
            }
            const userItems = await findPromise;
            if (userItems.length === 0) {
                throw new StatusError("No items available", {statusCode : 204});
            }
            
            if (limit === -1 ) {
                limit = userItems.length;
            }
            
            const startIndex = (page) * limit;
            const endIndex = (page+1) * limit;
            
            let paginationResults : PaginationResults<T> = {
                page,
                limit,
                totalItems: totalNumberOfItems,
                results: userItems
            };
            if (endIndex < totalNumberOfItems) {
                paginationResults.nextPage = page + 1;
            }
            if (page !== maxPage) {
                paginationResults.maxPage = maxPage;
            }
            if (startIndex > 0 ){
                paginationResults.previousPage = page - 1;
            }
            req.paginationResults = paginationResults;
            next();
        } catch (error) {
            SendError(res, error);
        }
    };
}