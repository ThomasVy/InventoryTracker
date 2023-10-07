export interface Link {
  title: string;
  link: string;
}

export const ADMIN_LINK: Link = { title: "Admin", link: "/admin" };
export const INVENTORY_LINK: Link = { title: "Inventory", link: "/inventory" };
export const INVENTORY_EDIT_LINK: Link = { title: "Inventory Edit", link: "/inventory/:id/edit" };
export const HOME_LINK: Link = { title: "Home", link: "/" };
export const ACCOUNT_LINK: Link = { title: "Account", link: "/account" };
export const LOGIN_LINK: Link = { title: "Login", link: "/login" };
export const REGISTER_LINK: Link = { title: "Register", link: "/register" };