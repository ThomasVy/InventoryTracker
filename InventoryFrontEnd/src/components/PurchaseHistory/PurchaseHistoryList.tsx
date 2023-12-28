import { Box } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useGetPurchaseHistory } from "src/hooks/usePurchaseRequests";
import PurchaseHistoryItem from "./PurchaseHistoryItem";
import PurchaseHistoryPaginationControls from "./PurchaseHistoryPaginationControls";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";

interface PurchaseHistoryListProps { 
  searchTerm: string
}

const LIMIT = 3;
const PurchaseHistoryList: FunctionComponent<PurchaseHistoryListProps> = ({searchTerm}) => {
  const [page, setPage] = useState<number>(0);
  const {
    isLoading,
    isError,
    error,
    statusCode,
    results,
  } = useGetPurchaseHistory(page, LIMIT, searchTerm);

  
  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent error={error} />;
  if (statusCode == 204 || !results) return <h3>No Purchases Available</h3>;
  return (
    <>
      <Box display="flex" flexDirection="column" gap={1} sx={{
        width: 3 / 4,
        maxWidth: "sm",
      }}
      >
        {results.results.map((order) => <PurchaseHistoryItem key={order.id} id={order.id} />)}
      </Box>
      <PurchaseHistoryPaginationControls
        page={results.page}
        limit={results.limit}
        totalItems={results.totalItems}
        nextPage={results.nextPage}
        maxPage={results.maxPage}
        previousPage={results.previousPage}
        setPage={setPage}
      />
    </>
  );
};

export default PurchaseHistoryList;
