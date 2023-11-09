import { useContext } from "react";
import ShoppingCartContext from "src/context/ShoppingCartProvider";

const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
}

export default useShoppingCart;