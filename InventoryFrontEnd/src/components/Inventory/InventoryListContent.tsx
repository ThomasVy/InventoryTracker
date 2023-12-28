import { FunctionComponent } from "react";
import InventoryItem from "./InventoryItem";
import {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { CreateCustomPaginationActions } from "../CreateCustomPaginationActions";
import { InventoryMini } from "src/data/InventoryConstants";
import { PaginationResults } from "src/data/PaginationConstants";

interface InventoryListContentProps {
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  limit: number,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>;
  results: PaginationResults<InventoryMini>,
}
const LIMIT_OPTIONS = [5, 10, 25, { label: "All", value: -1 }];

const InventoryListContent: FunctionComponent<InventoryListContentProps> = ({
  handleChangeRowsPerPage,
  limit,
  page,
  results: {previousPage, nextPage, maxPage, results, totalItems},
  setPage
}) => {
  const CustomPaginationActions = CreateCustomPaginationActions({
    previousPage,
    nextPage,
    maxPage,
    setPage,
  });

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

  if (results.length === 0) return fnDisplayAsSingleRowInTable(<h3>No inventory items available</h3>);
  
  return (
    <>
      <TableBody>
        {results.map((a) => {
          return <InventoryItem key={a.id} id={a.id} />
        }
        )}
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
