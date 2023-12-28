import { FunctionComponent, useState } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InventoryListContent from "./InventoryListContent";
import { useGetInventory } from "src/hooks/useInventoryRequests";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";

interface InventoryListProps {
  searchTerm: string
}

const InventoryList: FunctionComponent<InventoryListProps> = ({ searchTerm }) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };

  const {
    isLoading,
    isError,
    error,
    results,
  } = useGetInventory(page, limit, searchTerm);

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent error="Could not fetch inventory" />;
  if (!results) return <ErrorComponent error="Server did not supply data" />;

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "80vw", maxWidth: "lg" }}>
        <Table aria-label="simple table">
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Tag</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell align="left">Owner</TableCell>
              <TableCell align="left">Reference</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Stock</TableCell>
              <TableCell align="left">Cost&nbsp;($)</TableCell>
              <TableCell align="left">Modify</TableCell>
            </TableRow>
          </TableHead>
          <InventoryListContent
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            limit={limit}
            page={page}
            setPage={setPage}
            results={results}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default InventoryList;
