import { Box, IconButton } from "@mui/material";
import { FunctionComponent, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationDialog from "../ConfirmationDialog";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface RenderItemModifyingButtonsProps {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  removeAllQuantity: () => void;
}

const RenderItemModifyingButtons: FunctionComponent<
  RenderItemModifyingButtonsProps
> = ({ quantity, increaseQuantity, decreaseQuantity, removeAllQuantity }) => {
  const [
    openRemoveItemFromShoppingCartModal,
    setOpenRemoveItemFromShoppingCartModal,
  ] = useState<boolean>(false);
  if (quantity === 0) {
    return (
      <>
        <IconButton onClick={() => increaseQuantity()}>
          <AddCircleIcon sx={{ color: "green" }} />
        </IconButton>
      </>
    );
  }
  const decreaseQuantityWithConfirmationIfRemoval = () => {
    if (quantity == 1) {
      setOpenRemoveItemFromShoppingCartModal(true);
    } else {
      decreaseQuantity();
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
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
        <IconButton onClick={() => decreaseQuantityWithConfirmationIfRemoval()}>
          <RemoveIcon />
        </IconButton>
        {quantity}
        <IconButton onClick={() => increaseQuantity()}>
          <AddIcon />
        </IconButton>
        <ConfirmationDialog
          title={`Remove?`}
          open={openRemoveItemFromShoppingCartModal}
          setOpen={setOpenRemoveItemFromShoppingCartModal}
          onConfirm={() => removeAllQuantity()}
        >
          Are you sure you want to remove this item?
        </ConfirmationDialog>
      </Box>
    </>
  );
};

export default RenderItemModifyingButtons;
