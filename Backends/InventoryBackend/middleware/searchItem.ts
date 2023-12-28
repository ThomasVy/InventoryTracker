// import { NextFunction, Response, Request } from "express";
// import {z} from "zod";
// import PurchaseModel from "../model/PurchaseModel";
// import { SendError } from "../utils/ErrorHandling";

// const SearchItemParamSchema = z.object({
//     itemId: z.number()
// });

// export interface SearchItemRequest extends Request {
//     purchases: unknown;
// }

// export function searchItem(req: SearchItemRequest, res: Response, next: NextFunction) {
//     try {
//         const {userId} = req;
//         const {itemId} = SearchItemParamSchema.parse(req.query);
//         const purchases = PurchaseModel.find({userId, "items.id": itemId});
//         req.purchases = purchases;
//         next()
//     }
//     catch(error){
//         SendError(res, error);
//     }
// }