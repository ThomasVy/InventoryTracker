import { FunctionComponent, useState } from "react";
import InventoryItem from "./InventoryItem";
import { useQuery, useQueryClient } from "react-query";
import {
  INVENTORY_LIST_API,
  INVENTORY_LIST_REACT_QUERY_KEY,
  INVENTORY_REACT_QUERY_KEY
} from "../../data/InventoryConstants";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { CreateCustomPaginationActions } from "../CreateCustomPaginationActions";
import useInventoryRequest from "src/hooks/useInventoryRequest";

interface InventoryListProps {}

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const InventoryList: FunctionComponent<InventoryListProps> = () => {
  const inventoryRequest = useInventoryRequest();
  const queryClient = useQueryClient();
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      INVENTORY_REACT_QUERY_KEY
    ],
    queryFn: () => {
      return inventoryRequest.get(
        `${INVENTORY_LIST_API}?page=${page}&limit=${limit}`
      );
    },
  });
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(1);
    setLimit(parseInt(event.target.value, 10));
    queryClient.invalidateQueries({queryKey: [INVENTORY_REACT_QUERY_KEY], exact: true});
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;
  if (data?.status == 204) return <h3>No inventories available</h3>;
  const { results, previousPage, nextPage, maxPage, totalItems } = data?.data;
  const CustomPaginationActions = CreateCustomPaginationActions({
    previousPage,
    nextPage,
    maxPage,
    setPage,
  });
  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: "60vw" }}>
        <Table aria-label="simple table">
          <colgroup>
              <col style={{width:'5%'}}/>
              <col style={{width:'25%'}}/>
              <col style={{width:'5%'}}/>
              <col style={{width:'10%'}}/>
              <col style={{width:'10%'}}/>
              <col style={{width:'20%'}}/>
              <col style={{width:'30%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell align="left">Reference</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Stock</TableCell>
              <TableCell align="left">Cost&nbsp;($)</TableCell>
              <TableCell align="left">Modify</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((item) => (
              <InventoryItem
                key={item.itemId}
                {...item}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={totalItems}
                rowsPerPage={limit}
                page={page - 1}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={(
                  event: React.MouseEvent<HTMLButtonElement> | null,
                  newPage: number
                ) => setPage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={CustomPaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default InventoryList;
