import { FunctionComponent, useRef, useState } from "react";
import InventoryList from "../components/InventoryList";
import AddInventory from "../components/AddInventory";

interface InventoryProps {
}


const Inventory: FunctionComponent<InventoryProps> = () => {
    return (
        <>
            <AddInventory />
            <InventoryList />
        </>
    )
}
 
export default Inventory;