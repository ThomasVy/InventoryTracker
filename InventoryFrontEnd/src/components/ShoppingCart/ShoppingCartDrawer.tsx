import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import useShoppingCart from "src/hooks/useShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import SubmitPurchaseOrderButton from "./SubmitPurchaseOrderButton";
import RenderListOfItems from "../Purchase/RenderListOfItems";
import { ModifyingItemFuncs } from "src/data/ItemConstants";
import ConfirmationButton from "../ConfirmationButton";

interface ShoppingCartDrawerProps {
  isOpen: boolean;
}

const ShoppingCartDrawer: FunctionComponent<ShoppingCartDrawerProps> = ({
  isOpen,
}) => {
  const { closeCart, shoppingCart, clearShoppingCart, setItemPrice, addToCart, removeFromCart, decreaseCartQuantity, increaseCartQuantity } =
    useShoppingCart();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"))
  const largeScreenProps = {
    sx: { width: "800px" }
  };
  const smallScreenProps = {
    sx: { width: "100vw" }
  }
  const modifyingFuncs = (id: number): ModifyingItemFuncs => {
    return {
      decreaseQuantity: () => {
        decreaseCartQuantity(id);
      },
      increaseQuantity: () => {
        increaseCartQuantity(id);
      },
      removeAllQuantity: () => {
        removeFromCart(id)
      },
      setPrice: (newPrice: number) => {
        setItemPrice(id, newPrice);
      }
    };
  }
  return (
    <>
      <Drawer
        anchor="right"
        PaperProps={largeScreen ? largeScreenProps : smallScreenProps}
        open={isOpen}
        onClose={() => closeCart()}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: 5,
            width: "auto",
            gap: 4,
          }}
          role="presentation"
          onClick={() => closeCart}
          onKeyDown={() => closeCart}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ m: 2 }} variant="h4">
              Cart
            </Typography>
            <IconButton onClick={closeCart}>
              <CloseIcon />
            </IconButton>
          </Box>
          <RenderListOfItems items={shoppingCart} modifyItemFuncs={modifyingFuncs} addFunc={addToCart} />
          <Stack direction="row" justifyContent="space-between">
            <ConfirmationButton
              dialogContent="Are you sure you want to clear the shopping cart?"
              dialogTitle="Clear Shopping Cart?"
              onConfirm={() => clearShoppingCart()}
              buttonInfo={
                {
                  type: "Normal",
                  props: {
                    color: "error",
                    variant: "contained",
                    endIcon: <ClearAllIcon />
                  }
                }
              }
            >
              Clear
            </ConfirmationButton>
            <SubmitPurchaseOrderButton clearShoppingCart={clearShoppingCart} shoppingCart={shoppingCart} closeCart={closeCart} />
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
