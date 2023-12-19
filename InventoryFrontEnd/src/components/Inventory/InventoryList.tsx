import { FunctionComponent } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InventoryListContent from "./InventoryListContent";

interface InventoryListProps {
  searchTerm: string
}

const InventoryList: FunctionComponent<InventoryListProps> = ({searchTerm}) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ width: "80vw", maxWidth: "lg" }}>
        <Table aria-label="simple table">
          <colgroup>
              <col style={{width:'5%'}}/>
              <col style={{width:'25%'}}/>
              <col style={{width:'5%'}}/>
              <col style={{width:'10%'}}/>
              <col style={{width:'10%'}}/>
              <col style={{width:'10%'}}/>
              <col style={{width:'10%'}}/>
              <col style={{width:'30%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell align="left">Owner</TableCell>
              <TableCell align="left">Reference</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Stock</TableCell>
              <TableCell align="left">Cost&nbsp;($)</TableCell>
              <TableCell align="left">Modify</TableCell>
            </TableRow>
          </TableHead>
          <InventoryListContent searchTerm={searchTerm}/>
        </Table>
      </TableContainer>
    </>
  );
};

export default InventoryList;
