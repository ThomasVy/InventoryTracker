import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import useShoppingCart from "src/hooks/useShoppingCart";
import ShoppingCartItem from "./ShoppingCartItem";
import CloseIcon from "@mui/icons-material/Close";
import { formatCurrency } from "src/utilities/formatCurrency";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CheckIcon from "@mui/icons-material/Check";
import ConfirmationDialog from "../ConfirmationDialog";
import AddToShoppingCartById from "./AddToShoppingCartById";
import { LoadingButton } from "@mui/lab";
import { TransitionGroup } from "react-transition-group";

interface ShoppingCartDrawerProps {
  isOpen: boolean;
}

const ShoppingCartDrawer: FunctionComponent<ShoppingCartDrawerProps> = ({
  isOpen,
}) => {
  const [openClearModal, setOpenClearModal] = useState<boolean>(false);
  const { closeCart, shoppingCart, getTotal, clearShoppingCart, setItemPrice } =
    useShoppingCart();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"))
  const largeScreenProps = {
    sx: { width: "800px"}
  };
  const smallScreenProps = {
    sx: { width: "100vw"}
  }
  return (
    <>
      <Drawer
        anchor="right"
        PaperProps={ largeScreen ? largeScreenProps : smallScreenProps}
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
          <Stack direction="row" justifyContent="center">
            <AddToShoppingCartById />
          </Stack>
          <Stack flexDirection="column">
            <TransitionGroup>
              {shoppingCart.map((item) =>
                <Collapse key={item.id}><ShoppingCartItem {...item} setItemPrice={setItemPrice}/></Collapse>)
                }
            </TransitionGroup>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Typography fontWeight="bold" variant="h4">
              {formatCurrency(getTotal())}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Button
              color="error"
              component="label"
              variant="contained"
              endIcon={<ClearAllIcon />}
              onClick={() => setOpenClearModal(true)}
            >
              Clear
            </Button>
            <ConfirmationDialog
              title="Clear Shopping Cart?"
              open={openClearModal}
              setOpen={setOpenClearModal}
              onConfirm={() => clearShoppingCart()}
            >
              Are you sure you want to clear the shopping cart?
            </ConfirmationDialog>
            <LoadingButton
              type="submit"
              loading={false}
              variant="contained"
              endIcon={<CheckIcon />}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
