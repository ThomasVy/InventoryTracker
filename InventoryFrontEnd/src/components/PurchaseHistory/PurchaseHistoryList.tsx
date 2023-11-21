import { CircularProgress } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useGetPurchaseHistory } from "src/hooks/usePurchaseRequests";
import { CreateCustomPaginationActions } from "../CreateCustomPaginationActions";
import PurchaseHistoryItem from "./PurchaseHistoryItem";

interface PurchaseHistoryListProps {}

const LIMIT = 5;
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
  if (statusCode == 204 || !results ) return <h3>No purchases available</h3>;
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
    {results.map((order) => <PurchaseHistoryItem key={order.id} id={order.id} date={order.date} items={order.items}/>)}
    {startIndex}-{endIndex} of {totalItems}
    {CustomPaginationActions}
    </>
  );
};

export default PurchaseHistoryList;