import { Dayjs } from 'dayjs';
export const PURCHASE_API = "/purchase";

export const PURCHASE_LIST_KEY = "purchase_all";

export interface PurchaseItemDetails {
    id: number;
    quantity: number;
    price: number;
}

export interface PurchaseOrder {
    id: number;
    date: Dayjs,
    items: PurchaseItemDetails[];
}