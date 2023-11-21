import { Box, IconButton } from "@mui/material";
import { FunctionComponent, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useShoppingCart from "src/hooks/useShoppingCart";
import ConfirmationDialog from "../ConfirmationDialog";

interface ModifyShoppingCartQuantityButtonsProps {
  name: string;
  itemId: number;
  itemPrice: number;
}

const ModifyShoppingCartQuantityButtons: FunctionComponent<
  ModifyShoppingCartQuantityButtonsProps
> = ({ itemId, itemPrice, name }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    addToCart
  } = useShoppingCart();
  const [
    openRemoveItemFromShoppingCartModal,
    setOpenRemoveItemFromShoppingCartModal,
  ] = useState<boolean>(false);
  const itemQuantity = getItemQuantity(itemId);
  if (itemQuantity === 0) {
    return (
      <>
        <IconButton onClick={() => addToCart(itemId, itemPrice)}>
          <AddShoppingCartIcon sx={{ color: "green" }} />
        </IconButton>
      </>
    );
  }
  const decreaseQuantity = () => {
    if (itemQuantity == 1) {
      setOpenRemoveItemFromShoppingCartModal(true);
      return;
    } else {
      decreaseCartQuantity(itemId);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "flex-start"
        }}
      >
        <IconButton
          onClick={() => setOpenRemoveItemFromShoppingCartModal(true)}
        >
          <RemoveShoppingCartIcon sx={{ color: "red" }} />
        </IconButton>
        <IconButton onClick={() => decreaseQuantity()}>
          <RemoveIcon />
        </IconButton>
        {itemQuantity}
        <IconButton onClick={() => increaseCartQuantity(itemId)}>
          <AddIcon />
        </IconButton>
        <ConfirmationDialog
          title={`Remove ${name} from shopping cart?`}
          open={openRemoveItemFromShoppingCartModal}
          setOpen={setOpenRemoveItemFromShoppingCartModal}
          onConfirm={() => removeFromCart(itemId)}
        >
          Are you sure you want to remove this item from the shopping cart?
        </ConfirmationDialog>
      </Box>
    </>
  );
};

export default ModifyShoppingCartQuantityButtons;
