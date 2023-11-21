import CircularProgress from "@mui/material/CircularProgress";
import { FunctionComponent } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ModifyShoppingCartQuantityButtons from "./ModifyShoppingCartQuantityButtons";
import { formatCurrency } from "src/utilities/formatCurrency";
import { ShoppingCartItem as ProviderItem } from "src/context/ShoppingCartProvider";
import ShoppingCartItemPrice from "./ShoppingCartItemPrice";
import { useGetInventoryItem } from "src/hooks/useInventoryRequests";

interface ShoppingCartItemProps extends ProviderItem {
  setItemPrice: (id: number) => (newPrice : number) => void;
}

const ShoppingCartItem: FunctionComponent<ShoppingCartItemProps> = ({
  id,
  quantity,
  individualPrice,
  setItemPrice,
}) => {
  const {name, cost, imageLink, isLoading, isError, error} = useGetInventoryItem(id);
  if (isLoading) return <CircularProgress />;
  if (isError) {
    console.log(`Item doesn't ${error}`);
    return null;
  }
  const setIndividualPrice = setItemPrice(id);
  return (
    <Stack direction="row" gap={3} sx={{ py: 2, borderBottom: 1, borderColor: 'grey.500'}} alignItems="center">
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
