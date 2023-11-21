export const PURCHASE_API = "/purchase";

export const PURCHASE_LIST_KEY = "purchase_all";

export interface PurchaseItemDetails {
    itemId: number;
    quantity: number;
    individualCost: number;
}

export interface PurchaseOrder {
    purchaseList: PurchaseItemDetails[]
};
