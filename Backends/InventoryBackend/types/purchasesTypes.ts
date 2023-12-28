import {Request} from "express"

export const PURCHASE_ID_PARAM = "purchaseId" as const;

type PurchaseIdRequestParams = {
    [PURCHASE_ID_PARAM]: string
}

export type PurchaseIdRequest = Request <PurchaseIdRequestParams, {}, {}, {}>;