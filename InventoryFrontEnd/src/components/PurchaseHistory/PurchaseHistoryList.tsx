import { Box, CircularProgress } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useGetPurchaseHistory } from "src/hooks/usePurchaseRequests";
import PurchaseHistoryItem from "./PurchaseHistoryItem";
import PurchaseHistoryPaginationControls from "./PurchaseHistoryPaginationControls";

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
    data,
  } = useGetPurchaseHistory(page, LIMIT, searchTerm);


  if (isLoading) return <CircularProgress />;
  if (isError) return <pre>{error}</pre>;
  if (statusCode == 204 || !data) return <h3>No Purchases Available</h3>;
  return (
    <>
      <Box sx={{
        width: 3 / 4,
        maxWidth: "sm",
      }}
      >
        {data.results.map((order) => <PurchaseHistoryItem key={order.id} id={order.id} />)}
      </Box>
      <PurchaseHistoryPaginationControls
        page={data.page}
        limit={data.limit}
        totalItems={data.totalItems}
        nextPage={data.nextPage}
        maxPage={data.maxPage}
        previousPage={data.previousPage}
        setPage={setPage}
      />
    </>
  );
};

export default PurchaseHistoryList;
