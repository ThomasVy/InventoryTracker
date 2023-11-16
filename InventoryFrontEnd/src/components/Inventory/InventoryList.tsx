import { FunctionComponent } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InventoryItems from "./InventoryItems";

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
          <InventoryItems />
        </Table>
      </TableContainer>
    </>
  );
};

export default InventoryList;
