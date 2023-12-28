import CircularProgress from "@mui/material/CircularProgress";
import { FunctionComponent } from "react";
import { Box, Stack, Typography } from "@mui/material";
import RenderItemModifyingButtons from "./RenderItemModifyingButtons";
import { formatCurrency } from "src/utilities/formatCurrency";
import RenderItemPrice from "./RenderItemPrice";
import { useGetInventoryItem } from "src/hooks/useInventoryRequests";
import { ModifyingItemFuncs } from "src/data/ItemConstants";
import { PurchaseItemDetails } from "src/data/PurchaseConstants";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";

interface RenderItemProps extends PurchaseItemDetails {
  modifyItemFuncs: (id: string) => ModifyingItemFuncs;
}

const RenderItem: FunctionComponent<RenderItemProps> = ({
  id,
  quantity,
  price,
  modifyItemFuncs
}) => {
  const { data, isLoading, isError, error } = useGetInventoryItem(id);
  if (isLoading) return <LoadingComponent />;
  if (isError) {
    console.log(`Item doesn't exist ${error}`);
    return <ErrorComponent error={error} />;
  }
  const { decreaseQuantity, increaseQuantity, removeAllQuantity, setPrice } = modifyItemFuncs(id);

  return (
    <Stack direction="row" gap={3} sx={{ py: 2, borderBottom: 1, borderColor: 'grey.500' }} alignItems="center">
      <Box
        component="img"
        alt="Image Missing"
        src={data.imageLink}
        style={{ width: "150px", aspectRatio: 3 / 2, objectFit: "contain" }}
      />
      <Stack flexDirection="column" justifyContent="center" justifyItems="center">
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle1" color="text.secondary">
            [{data.tag}]&nbsp;
          </Typography>
          <Typography variant="h6" color={data.name ? "text.primary" : "text.secondary"}>
            {data.name ?? <i>(Item was deleted)</i>}
          </Typography>
        </Stack>
        <RenderItemModifyingButtons
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          quantity={quantity}
          removeAllQuantity={removeAllQuantity}
        />
        <Typography fontSize={14} variant="subtitle1">
          Price per Item: {formatCurrency(price / quantity)}
        </Typography>
      </Stack>
      <Box
        flexGrow={1}
      >
        <RenderItemPrice
          price={price}
          setPrice={setPrice}
        />
      </Box>
    </Stack>
  );
};

export default RenderItem;
