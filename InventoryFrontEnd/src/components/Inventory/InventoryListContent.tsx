import { FunctionComponent, useState } from "react";
import InventoryItem from "./InventoryItem";
import {
  CircularProgress,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { CreateCustomPaginationActions } from "../CreateCustomPaginationActions";
import { useGetInventory } from "src/hooks/useInventoryRequests";

interface InventoryListContentProps {
  searchTerm: string
}
const LIMIT_OPTIONS = [5, 10, 25, { label: "All", value: -1 }];

const InventoryListContent: FunctionComponent<InventoryListContentProps> = ({searchTerm}) => {
  const [limit, setLimit] = useState<number>(5);
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
  } = useGetInventory(page, limit, searchTerm);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };
  const fnDisplayAsSingleRowInTable = (ItemToBeDisplay: JSX.Element) => {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8} align="center">
            {ItemToBeDisplay}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  if (isLoading) return fnDisplayAsSingleRowInTable(<CircularProgress />);
  if (isError)
    return fnDisplayAsSingleRowInTable(<pre>{error}</pre>);
  if (statusCode == 204 || !results )
    return fnDisplayAsSingleRowInTable(<h3>No inventories available</h3>);
  const CustomPaginationActions = CreateCustomPaginationActions({
    previousPage,
    nextPage,
    maxPage,
    setPage,
  });

  return (
    <>
      <TableBody>
        {results.map(({id} : {id : number}) => (
          <InventoryItem key={id} id={id} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={LIMIT_OPTIONS}
            count={totalItems}
            rowsPerPage={limit}
            page={page}
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

export default InventoryListContent;
