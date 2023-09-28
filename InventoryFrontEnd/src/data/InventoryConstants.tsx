const INVENTORY_LIST_API = "/inventory";
 
const INVENTORY_ADD_API = "/inventory/add";

const INVENTORY_REACT_QUERY_KEY = "inventory";

const INVENTORY_ID_API = "/inventory/:id";

interface InventoryItemDetails {
    id?: number;
    name: string;
    stock: number;
    cost: number;
    reference?: string;
};
 
export {InventoryItemDetails, INVENTORY_REACT_QUERY_KEY, INVENTORY_ADD_API, INVENTORY_LIST_API, INVENTORY_ID_API};