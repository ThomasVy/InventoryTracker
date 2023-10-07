export const INVENTORY_LIST_API = "/inventory";
export const INVENTORY_ADD_API = "/inventory/add";
export const INVENTORY_ID_API = "/inventory/:id";

export const INVENTORY_REACT_QUERY_KEY = "inventory";
export const INVENTORY_PAGE_REACT_QUERY_KEY = "inventory_page";
export const INVENTORY_LIMIT_REACT_QUERY_KEY = "inventory_limit";
export const INVENTORY_PAGE_LIMIT = 2;

export interface InventoryItemDetails {
    id?: number;
    name: string;
    stock: number;
    cost: number;
    reference?: string;
};
