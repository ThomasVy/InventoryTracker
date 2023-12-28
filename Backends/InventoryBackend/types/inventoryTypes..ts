import {Request} from "express"

export const INVENTORY_ID_PARAM = "inventoryId" as const;
export const INVENTORY_TAG_PARAM = "tag" as const;

type InventoryIdRequestParams = {
    [INVENTORY_ID_PARAM]: string
}

type InventoryTagRequestParams = {
    [INVENTORY_TAG_PARAM]: string
}

export type InventoryIdRequest = Request <InventoryIdRequestParams, {}, {}, {}>;

export type InventoryTagRequest = Request <InventoryTagRequestParams, {}, {}, {}>;