import {
  Box,
  Drawer,
} from "@mui/material";
import { FunctionComponent } from "react";
import useShoppingCart from "src/hooks/useShoppingCart";
import CartItem from "./Cartitem";

interface ShoppingCartDrawerProps {
  isOpen: boolean;
}

const ShoppingCartDrawer: FunctionComponent<ShoppingCartDrawerProps> = ({
  isOpen,
}) => {
  const { closeCart, shoppingCart } = useShoppingCart();
  return (
    <div>
      <Drawer anchor="right" PaperProps={{
            sx: { width: "50%" },
          }} open={isOpen} onClose={() => closeCart()}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => closeCart}
          onKeyDown={() => closeCart}
        >
          {shoppingCart.map((item)=>{
           return <CartItem key={item.id} {...item}/>;
          })}
        </Box>
      </Drawer>
    </div>
  );
};

export default ShoppingCartDrawer;
