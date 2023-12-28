import { FunctionComponent } from "react";
import {
  Box,
  TableCell,
  TableRow,
} from "@mui/material";
import { useGetInventoryItem } from "src/hooks/useInventoryRequests";
import { formatCurrency } from "src/utilities/formatCurrency";
import RenderItemModifyingButtons from "../Purchase/RenderItemModifyingButtons";
import useShoppingCart from "src/hooks/useShoppingCart";
import EditInventoryButton from "./EditInventoryButton";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";

interface InventoryItemProps {
  id: string;
}

const InventoryItem: FunctionComponent<InventoryItemProps> = ({ id }) => {
  const fnDisplayAsSingleRowInTable = (ItemToBeDisplay: JSX.Element) => {
    return (
      <TableRow>
        <TableCell colSpan={8} align="center">
          {ItemToBeDisplay}
        </TableCell>
      </TableRow>
    );
  };
  const { getItemQuantity, addToCart, removeFromCart, decreaseCartQuantity, increaseCartQuantity } = useShoppingCart();
  const {
    isLoading,
    isError,
    data
  } = useGetInventoryItem(id);
  if (isLoading) return fnDisplayAsSingleRowInTable(<LoadingComponent />);
  if (isError) return fnDisplayAsSingleRowInTable(<ErrorComponent error="Could not load item"/>);
  if (!data) return fnDisplayAsSingleRowInTable(<h3>Item does not exist</h3>);
    
  const quantityInShoppingCart = getItemQuantity(id);

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="left">{data.tag}</TableCell>
        <TableCell align="left">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {data.name}
            <RenderItemModifyingButtons
              decreaseQuantity={() => {
                decreaseCartQuantity(id);
              }}
              increaseQuantity={() => {
                if (quantityInShoppingCart == 0) {
                  addToCart(id, data.cost);
                } else {
                  increaseCartQuantity(id);
                }
              }}
              quantity={getItemQuantity(id)}
              removeAllQuantity={() => {
                removeFromCart(id);
              }}
            />
          </Box>
        </TableCell>
        <TableCell align="left">{data.owner}</TableCell>
        <TableCell align="left">{data.reference ?? "-"}</TableCell>
        <TableCell align="left">{data.type}</TableCell>
        <TableCell align="left">{data.stock}</TableCell>
        <TableCell align="left">{formatCurrency(data.cost)}</TableCell>
        <TableCell align="left">
          <EditInventoryButton id={id}/>
        </TableCell>
      </TableRow>
    </>
  );
};

export default InventoryItem;
