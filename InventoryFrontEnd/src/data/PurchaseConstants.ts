export const PURCHASE_API = "/purchase";

export const PURCHASE_LIST_KEY = "purchase";

export interface PurchaseItemDetails {
    id: number;
    quantity: number;
    price: number;
}

export interface PurchaseOrder {
    id: number;
    date: Date,
    items: PurchaseItemDetails[];
}