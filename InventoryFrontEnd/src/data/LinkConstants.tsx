export interface Link {
  title: string;
  link: string;
}

export const ADMIN_LINK: Link = { title: "Admin", link: "/admin" };
export const INVENTORY_LINK: Link = { title: "Inventory", link: "/inventory" };
export const INVENTORY_EDIT_LINK: Link = { title: "Edit Inventory Item", link: `${INVENTORY_LINK.link}/:id` };
export const HOME_LINK: Link = { title: "Home", link: "/" };
export const ACCOUNT_LINK: Link = { title: "Account", link: "/account" };
export const LOGIN_LINK: Link = { title: "Login", link: "/login" };
export const REGISTER_LINK: Link = { title: "Register", link: "/register" };
export const PURCHASE_HISTORY_LINK: Link = { title: "History", link: "/purchase-history" };
export const PURCHASE_EDIT_LINK: Link = { title: "Edit Purchase Order", link: `${PURCHASE_HISTORY_LINK.link}/:purchaseId` };

export function GetInventoryEditLink(id: number) {
  return `${INVENTORY_LINK.link}/${id}`;
}

export function GetPurchaseEditLink(id: number) {
  return `${PURCHASE_HISTORY_LINK.link}/${id}`;
}