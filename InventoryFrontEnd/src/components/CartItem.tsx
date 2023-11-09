import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import inventoryRequest from "src/api/inventoryRequest";
import {
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
} from "src/data/InventoryConstants";
import useShoppingCart from "src/hooks/useShoppingCart";
import { FunctionComponent } from "react";

interface CartItemProps {
  id: number;
  quantity: number;
}

const CartItem: FunctionComponent<CartItemProps> = ({ id, quantity }) => {
  const { removeFromCart } = useShoppingCart();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [INVENTORY_REACT_QUERY_KEY, id],
    queryFn: () => {
      return inventoryRequest.get(`${INVENTORY_LIST_API}/${id}`);
    },
  });
  if (isLoading) return <CircularProgress />;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;
  const { itemId, name, stock, cost, reference, type } = data?.data;
  return (
    <h2>
      {id} {quantity} {name} {stock} {cost} {reference} {type}
    </h2>
  );
};

export default CartItem;
