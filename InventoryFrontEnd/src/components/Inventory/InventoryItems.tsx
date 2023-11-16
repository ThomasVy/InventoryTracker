import { FunctionComponent, useState } from "react";
import InventoryItem from "./InventoryItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  INVENTORY_ALL_REACT_QUERY_KEY,
  INVENTORY_LIST_API,
} from "../../data/InventoryConstants";
import {
  CircularProgress,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { CreateCustomPaginationActions } from "../CreateCustomPaginationActions";
import useInventoryRequest from "src/hooks/useInventoryRequest";

interface InventoryItemsProps {}
const LIMIT_OPTIONS = [5, 10, 25, { label: "All", value: -1 }];

const InventoryItems: FunctionComponent<InventoryItemsProps> = () => {
  const inventoryRequest = useInventoryRequest();
  const queryClient = useQueryClient();
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      INVENTORY_ALL_REACT_QUERY_KEY,
      {
        page,
        limit,
      },
    ],
    queryFn: () => {
      return inventoryRequest.get(INVENTORY_LIST_API, {
        params: {
          page: page,
          limit: limit,
        },
      });
    },
  });
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(1);
    setLimit(parseInt(event.target.value, 10));
    queryClient.invalidateQueries({
      queryKey: [INVENTORY_ALL_REACT_QUERY_KEY],
    });
  }
  const fnDisplayAsSingleRowInTable = (ItemToBeDisplay: JSX.Element) =>  {
    return <TableBody><TableRow><TableCell colSpan={8} align="center" >{ItemToBeDisplay}</TableCell></TableRow></TableBody>;
  }

  if (isLoading) return fnDisplayAsSingleRowInTable(<CircularProgress/>);
  if (isError) return fnDisplayAsSingleRowInTable(<pre>{JSON.stringify(error)}</pre>);
  if (data?.status == 204) return fnDisplayAsSingleRowInTable(<h3>No inventories available</h3>);
  const { results, previousPage, nextPage, maxPage, totalItems } = data?.data;
  const CustomPaginationActions = CreateCustomPaginationActions({
    previousPage,
    nextPage,
    maxPage,
    setPage,
  });

  return (
    <>
      <TableBody>
        {results.map((itemId) => (
          <InventoryItem key={itemId} id={itemId} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={LIMIT_OPTIONS}
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
    </>
  );
};

export default InventoryItems;
