import { FunctionComponent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TableCell,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { INVENTORY_LINK } from "src/data/LinkConstants";
import { useGetInventoryItem } from "src/hooks/useInventoryRequests";
import ModifyShoppingCartQuantityButtons from "../ShoppingCart/ModifyShoppingCartQuantityButtons";
import { formatCurrency } from "src/utilities/formatCurrency";
import DeleteInventoryItem from "./DeleteInventoryItem";

interface InventoryItemProps {
  id: number;
}

const InventoryItem: FunctionComponent<InventoryItemProps> = ({ id }) => {
  const fnDisplayAsSingleRowInTable = (ItemToBeDisplay: JSX.Element) => {
    return (
      <TableRow>
        <TableCell colSpan={8} align="center">
          {ItemToBeDisplay}
        </TableCell>
      </TableRow>
    );
  };
  const {
    isLoading,
    isError,
    error,
    statusCode,
    name,
    reference,
    type,
    stock,
    cost,
    owner,
  } = useGetInventoryItem(id);
  if (isLoading) return fnDisplayAsSingleRowInTable(<CircularProgress />);
  if (isError) return fnDisplayAsSingleRowInTable(<pre>{error}</pre>);
  if (statusCode == 204)
    return fnDisplayAsSingleRowInTable(<h3>Item does not exist</h3>);

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="left">{id}</TableCell>
        <TableCell align="left">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {name}
            <ModifyShoppingCartQuantityButtons
              itemId={id}
              itemPrice={cost}
              name={name}
            />
          </Box>
        </TableCell>
        <TableCell align="left">{owner}</TableCell>
        <TableCell align="left">{reference ? reference : "-"}</TableCell>
        <TableCell align="left">{type}</TableCell>
        <TableCell align="left">{stock}</TableCell>
        <TableCell align="left">{formatCurrency(cost)}</TableCell>
        <TableCell align="left">
          <Button
            component={Link}
            to={`${INVENTORY_LINK.link}/${id}/edit`}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <DeleteInventoryItem id={id} name={name} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default InventoryItem;
