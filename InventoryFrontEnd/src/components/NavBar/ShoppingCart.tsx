import { Tooltip, IconButton, Badge } from "@mui/material";
import { FunctionComponent } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import useShoppingCart from "src/hooks/useShoppingCart";
import useAuth from "src/hooks/useAuth";

interface ShoppingCartProps {}

const ShoppingCart: FunctionComponent<ShoppingCartProps> = () => {
  const { totalItemsInCart, openCart } = useShoppingCart();
  const { auth } = useAuth();
  if (!auth) {
    return null;
  }
  return (
    <>
      <Tooltip title="Open Purchase Menu">
        <IconButton onClick={() => openCart()}>
          <Badge badgeContent={totalItemsInCart} color="primary">
            <ShoppingBasketIcon color="action" />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ShoppingCart;
