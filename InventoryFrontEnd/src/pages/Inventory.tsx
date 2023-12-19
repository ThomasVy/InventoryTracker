import { FunctionComponent, useRef, useState } from "react";
import InventoryList from "../components/Inventory/InventoryList";
import AddInventory from "../components/Inventory/AddInventory";
import SearchBar from "src/components/SearchBar";
import useDebounce from "src/hooks/useDebounce";

interface InventoryProps {}

const Inventory: FunctionComponent<InventoryProps> = () => {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500);
  return (
    <>
        <AddInventory />
        <h1>Inventory List</h1>
        <SearchBar search={search} setSearch={setSearch}/>
        <InventoryList searchTerm={debouncedSearch}/>
    </>
  );
};

export default Inventory;
