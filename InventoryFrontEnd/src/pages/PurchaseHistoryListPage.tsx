import { Stack } from "@mui/material";
import { FunctionComponent, useState } from 'react';
import PurchaseHistoryList from "src/components/PurchaseHistory/PurchaseHistoryList";
import SearchBar from "src/components/SearchBar";
import useDebounce from "src/hooks/useDebounce";

interface PurchaseHistoryPageProps {}

const PurchaseHistoryListPage: FunctionComponent<PurchaseHistoryPageProps> = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  return (
    <>
      <h1>Purchase History</h1>
      <SearchBar search={search} setSearch={setSearch}/>
      <PurchaseHistoryList searchTerm={debouncedSearch} />
    </>
  );
};

export default PurchaseHistoryListPage;
