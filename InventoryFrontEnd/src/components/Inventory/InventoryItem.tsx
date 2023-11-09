import { FunctionComponent } from "react";
import {
  INVENTORY_LIST_REACT_QUERY_KEY,
  InventoryItemDetails,
} from "../../data/InventoryConstants";
import { useMutation, useQueryClient } from "react-query";
import {
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
} from "../../data/InventoryConstants";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { INVENTORY_LINK } from "src/data/LinkConstants";
import useInventoryRequest from "src/hooks/useInventoryRequest";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useShoppingCart from "src/hooks/useShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface AddToCartButtonsProps {
  itemId: number;
}

const AddToCartButtons: FunctionComponent<AddToCartButtonsProps> = ({
  itemId,
}) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const itemQuantity = getItemQuantity(itemId);
  if (itemQuantity === 0) {
    return (
      <>
        <IconButton onClick={() => increaseCartQuantity(itemId)}>
          <AddShoppingCartIcon sx={{ color: "green" }} />
        </IconButton>
      </>
    );
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => removeFromCart(itemId)}>
          <RemoveShoppingCartIcon sx={{ color: "red" }} />
        </IconButton>
        <IconButton onClick={() => decreaseCartQuantity(itemId)}>
          <RemoveIcon />
        </IconButton>
        {itemQuantity}
        <IconButton onClick={() => increaseCartQuantity(itemId)}>
          <AddIcon />
        </IconButton>
      </Box>
    </>
  );
};

const InventoryItem: FunctionComponent<InventoryItemDetails> = ({
  itemId,
  name,
  stock,
  cost,
  reference,
  type,
}) => {
  const inventoryRequest = useInventoryRequest();
  const queryClient = useQueryClient();
  queryClient.setQueryData([INVENTORY_REACT_QUERY_KEY, itemId], {
    itemId,
    name,
    stock,
    cost,
    reference,
    type,
  });
  const deleteMutation = useMutation({
    mutationFn: () => {
      return inventoryRequest.delete(`${INVENTORY_LIST_API}/${itemId}`);
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [INVENTORY_REACT_QUERY_KEY],
          exact: true,
        }),
        queryClient.invalidateQueries({
          queryKey: [INVENTORY_REACT_QUERY_KEY, itemId],
        }),
      ]),
  });

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="left">{itemId}</TableCell>
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
            <AddToCartButtons itemId={itemId} />
          </Box>
        </TableCell>
        <TableCell align="left">{reference ? reference : "-"}</TableCell>
        <TableCell align="left">{type}</TableCell>
        <TableCell align="left">{stock}</TableCell>
        <TableCell align="left">{cost}</TableCell>
        <TableCell align="left">
          <Button
            component={Link}
            to={`${INVENTORY_LINK.link}/${itemId}/edit`}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <LoadingButton
            onClick={() => deleteMutation.mutate()}
            endIcon={<DeleteIcon />}
            loading={deleteMutation.isLoading}
            loadingPosition="end"
          >
            Delete
          </LoadingButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default InventoryItem;
