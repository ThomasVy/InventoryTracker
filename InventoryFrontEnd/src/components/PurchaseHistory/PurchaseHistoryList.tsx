import { CircularProgress } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useGetPurchaseHistory } from "src/hooks/usePurchaseRequests";
import { CreateCustomPaginationActions } from "../CreateCustomPaginationActions";
import PurchaseHistoryItem from "./PurchaseHistoryItem";

interface PurchaseHistoryListProps {}

const LIMIT = 3;
const PurchaseHistoryList: FunctionComponent<PurchaseHistoryListProps> = () => {
    const [page, setPage] = useState<number>(0);
    const {
      isLoading,
      isError,
      error,
      statusCode,
      results,
      previousPage,
      nextPage,
      maxPage,
      totalItems,
    } = useGetPurchaseHistory(page, LIMIT);

    
  if (isLoading) return <CircularProgress />;
  if (isError) return <pre>{error}</pre>;
  if (statusCode == 204 || !results ) return <h3>No Purchases Available</h3>;
  const CustomPaginationActions = CreateCustomPaginationActions({
    previousPage,
    nextPage,
    maxPage,
    setPage,
  })({ page: page});
  const startIndex = page * LIMIT + 1;
  const endIndex = Math.min((page+1) * LIMIT, totalItems);
  return (
    <>
    {startIndex}-{endIndex} of {totalItems}
    {CustomPaginationActions}
    {results.map((order) => <PurchaseHistoryItem key={order.id} id={order.id}/>)}
    </>
  );
};

export default PurchaseHistoryList;
