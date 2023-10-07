import { FunctionComponent, useRef, useState } from "react";
import InventoryList from "../components/Inventory/InventoryList";
import AddInventory from "../components/Inventory/AddInventory";
import { Stack } from "@mui/material";
import SearchBar from "src/components/SearchBar";

interface InventoryProps {}

const Inventory: FunctionComponent<InventoryProps> = () => {
  return (
    <>
        <AddInventory />
        <h1>Inventory List</h1>
        <SearchBar />
        <InventoryList />
    </>
  );
};

export default Inventory;
