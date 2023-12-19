import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { SendError } from "../utils/ErrorHandling";
import { StatusError } from "../types/error";
import { PaginationRequest, PaginationResults } from "../types/paginationTypes";
import { z } from "zod";

const DEFAULT_LIMIT = 5;
const DEFAULT_PAGE = 0;

const QueryPaginationSchema = z.object({
    page: z.coerce.number().default(DEFAULT_PAGE),
    limit: z.coerce.number().default(DEFAULT_LIMIT),
    search: z.string().default("")
});

export function paginatedResults<T>(model : Model<T>) {
    return async (req: PaginationRequest<T>, res: Response, next: NextFunction) => {
        try {
            let {page, limit} = QueryPaginationSchema.parse(req.query);
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
            const userItems = await findPromise.exec();
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

export function searchTerm<T>(model: Model<T>, field: string) {
    return async ( req: PaginationRequest<T>, res: Response, next: NextFunction ) => {
        try {
            const {userId} = req;
            let {page, limit, search} = QueryPaginationSchema.parse(req.query);
            const filter = {
                userId,
                [field]: {"$regex": search, "$options": "i" },
            }
            const numberOfDocuments = await model.countDocuments(filter);
            const maxPage = Math.ceil(numberOfDocuments / limit) - 1;
            if (page > maxPage) {
                page = 0;
            }
            const searchResultsQuery = model.find(filter);
            if (limit !== -1) {
                searchResultsQuery.limit(limit).skip(page * limit);
            }
            const userItems = await searchResultsQuery.exec();
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
                totalItems: numberOfDocuments,
                results: userItems
            };
            if (endIndex < numberOfDocuments) {
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
    }
}