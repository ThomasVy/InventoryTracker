import { FunctionComponent } from "react";
import useShoppingCart from "src/hooks/useShoppingCart";

interface PurchasePageProps {
    
}
 
const PurchasePage: FunctionComponent<PurchasePageProps> = () => {
    const {totalItemsInCart} = useShoppingCart();
    return ( <>
        <h1>Shopping Cart</h1>
        <h2>You got {totalItemsInCart} item</h2>
    </> );
}
 
export default PurchasePage;