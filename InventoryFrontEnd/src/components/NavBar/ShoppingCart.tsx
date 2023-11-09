import { Tooltip, IconButton, Badge } from "@mui/material";
import { FunctionComponent } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import useShoppingCart from "src/hooks/useShoppingCart";
import { Link } from "react-router-dom";
import { PURCHASE_LINK } from "src/data/LinkConstants";

interface ShoppingCartProps {}

const ShoppingCart: FunctionComponent<ShoppingCartProps> = () => {
  const { totalItemsInCart, openCart } = useShoppingCart();

  if (totalItemsInCart === 0) {
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
