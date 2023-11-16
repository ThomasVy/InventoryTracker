import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import inventoryRequest from "src/api/inventoryRequest";
import {
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
} from "src/data/InventoryConstants";
import { FunctionComponent } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ModifyShoppingCartQuantityButtons from "./ModifyShoppingCartQuantityButtons";
import { formatCurrency } from "src/utilities/formatCurrency";
import { ShoppingCartItem as ProviderItem } from "src/context/ShoppingCartProvider";
import ShoppingCartItemPrice from "./ShoppingCartItemPrice";

interface ShoppingCartItemProps extends ProviderItem {
  setItemPrice: (id: number) => (newPrice : number) => void;
}

const ShoppingCartItem: FunctionComponent<ShoppingCartItemProps> = ({
  id,
  quantity,
  individualPrice,
  setItemPrice,
}) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [INVENTORY_REACT_QUERY_KEY, `${id}`],
    queryFn: () => {
      return inventoryRequest.get(`${INVENTORY_LIST_API}/${id}`);
    },
  });
  if (isLoading) return <CircularProgress />;
  if (isError) {
    console.log(`Item doesn't ${JSON.stringify(error)}`);
    return null;
  }
  const { name, cost, imageLink } = data?.data;
  const setIndividualPrice = setItemPrice(id);
  return (
    <Stack direction="row" gap={3} alignItems="center">
      <Box
        component="img"
        alt="No Image"
        src={imageLink}
        style={{ width: "150px", aspectRatio: 3 / 2, objectFit: "contain" }}
      />
      <Stack flexDirection="column" justifyContent="center" justifyItems="center">
        <Typography variant="h6">
          {id} - {name}
        </Typography>
        <ModifyShoppingCartQuantityButtons
          itemId={id}
          itemPrice={cost}
          name={name}
        />
        <Typography fontSize={14} variant="subtitle1">
            Price per Item: {formatCurrency(individualPrice)}
        </Typography>
      </Stack>
      <Box
        flexGrow={1}
      >
        <ShoppingCartItemPrice
          price={individualPrice}
          quantity={quantity}
          setPrice={setIndividualPrice}
        />
      </Box>
    </Stack>
  );
};

export default ShoppingCartItem;
