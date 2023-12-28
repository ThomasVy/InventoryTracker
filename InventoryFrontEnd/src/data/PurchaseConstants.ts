export const PURCHASE_API = "/purchase";

export const PURCHASE_LIST_KEY = "purchase";

export interface PurchaseItemDetails {
    id: string;
    quantity: number;
    price: number;
}

export interface PurchaseOrder {
    id: string;
    date: Date,
    items: PurchaseItemDetails[];
}

export type PurchaseMini = Pick<PurchaseOrder, "id">;