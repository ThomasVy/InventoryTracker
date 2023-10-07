import { FunctionComponent, useEffect, useState } from "react";
import InventoryItem from "./InventoryItem";
import { useQuery, useQueryClient } from "react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  INVENTORY_LIMIT_REACT_QUERY_KEY,
  INVENTORY_LIST_API,
  INVENTORY_PAGE_LIMIT,
  INVENTORY_REACT_QUERY_KEY,
} from "../../data/InventoryConstants";
import {
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
  const privateApi = useAxiosPrivate();
  const queryClient = useQueryClient();
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      INVENTORY_REACT_QUERY_KEY,
      INVENTORY_PAGE_LIMIT,
      page,
      INVENTORY_LIMIT_REACT_QUERY_KEY,
      limit,
    ],
    queryFn: () => {
      return privateApi.get(
        `${INVENTORY_LIST_API}?page=${page}&limit=${limit}`
      );
    },
  });
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(1);
    setLimit(parseInt(event.target.value, 10));
    queryClient.invalidateQueries([{ limit }]);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;
  if (data?.status == 201) return <h3>No inventories available</h3>;
  const { results, previousPage, nextPage, maxPage, totalItems } = data?.data;
  const CustomPaginationActions = CreateCustomPaginationActions({
    previousPage,
    nextPage,
    maxPage,
    setPage,
  });
  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: "50vw" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="left">Stock</TableCell>
              <TableCell align="left">Cost&nbsp;($)</TableCell>
              <TableCell align="left">Reference</TableCell>
              <TableCell align="left">Modify</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((item) => (
              <InventoryItem
                key={item._id}
                id={item._id}
                name={item.name}
                stock={item.stock}
                cost={item.cost}
                reference={item.reference}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={1}
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
