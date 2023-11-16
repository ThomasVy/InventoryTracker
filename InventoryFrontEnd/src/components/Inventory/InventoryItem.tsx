import { FunctionComponent } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
} from "../../data/InventoryConstants";

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
import useInventoryRequest from "src/hooks/useInventoryRequest";
import ModifyShoppingCartQuantityButtons from "../ShoppingCart/ModifyShoppingCartQuantityButtons";
import { formatCurrency } from "src/utilities/formatCurrency";
import DeleteInventoryItem from "./DeleteInventoryItem";

interface InventoryItemProps {
  id: number;
}

const InventoryItem: FunctionComponent<InventoryItemProps> = ({ id }) => {
  const inventoryRequest = useInventoryRequest();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [INVENTORY_REACT_QUERY_KEY, `${id}`],
    queryFn: () => {
      return inventoryRequest.get(`${INVENTORY_LIST_API}/${id}`);
    },
  });

  const fnDisplayAsSingleRowInTable = (ItemToBeDisplay: JSX.Element) => {
    return (
      <TableRow>
        <TableCell colSpan={8} align="center">
          {ItemToBeDisplay}
        </TableCell>
      </TableRow>
    );
  };

  if (isLoading) return fnDisplayAsSingleRowInTable(<CircularProgress />);
  if (isError)
    return fnDisplayAsSingleRowInTable(<pre>{JSON.stringify(error)}</pre>);
  if (data?.status == 204)
    return fnDisplayAsSingleRowInTable(<h3>Item does not exist</h3>);
  const { name, reference, type, stock, cost } = data?.data;

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
