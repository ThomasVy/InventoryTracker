import { Stack } from "@mui/material";
import { FunctionComponent } from "react";
import PurchaseHistoryList from "src/components/PurchaseHistory/PurchaseHistoryList";
import SearchBar from "src/components/SearchBar";

interface PurchaseHistoryPageProps {}

const PurchaseHistoryListPage: FunctionComponent<PurchaseHistoryPageProps> = () => {
  return (
    <>
      <h1>Purchase History</h1>
      <SearchBar />
      <PurchaseHistoryList />
    </>
  );
};

export default PurchaseHistoryListPage;
