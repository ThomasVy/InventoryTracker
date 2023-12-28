export const INVENTORY_LIST_API = "/inventory";
export const INVENTORY_ADD_API = "/inventory/add";
export const INVENTORY_ID_API = "/inventory/:id";

export const INVENTORY_REACT_QUERY_KEY = "inventory"

export type InventoryItemDetails = {
    id: string,
    tag: string;
    name: string;
    stock: number;
    cost: number;
    type: string;
    owner: string;
    reference?: string;
};

export type InventoryItemsWithoutId = Omit<InventoryItemDetails, "id">;

export type InventoryMini = Pick<InventoryItemDetails, "id" | "tag" | "name">;
