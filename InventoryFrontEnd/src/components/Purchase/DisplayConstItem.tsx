import { Stack, Box, Typography, CircularProgress } from "@mui/material";
import { FunctionComponent } from "react";
import { PurchaseItemDetails } from "src/data/PurchaseConstants";
import { useGetInventoryItem } from "src/hooks/useInventoryRequests";
import { formatCurrency } from "src/utilities/formatCurrency";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";


const DisplayConstItem: FunctionComponent<PurchaseItemDetails> = ({
  id,
  quantity,
  price
}) => {
  const { data, isLoading, isError, error } = useGetInventoryItem(id);
  if (isLoading) return <LoadingComponent />
  if (isError) {
    console.log(`Item doesn't ${error}`);
    return <ErrorComponent error={error} />;
  }
  return (
    <>
      <Stack
        direction="row"
        gap={3}
        marginY={1}
      >
        <Box
          component="img"
          alt="Image Missing"
          src={data.imageLink}
          style={{ width: "130px", aspectRatio: 3 / 2, objectFit: "contain" }}
        />
        <Stack
          flexDirection="row"
          flexGrow={1}
          flexWrap="wrap"
        >
          <Stack direction="row" alignItems="center">
            <Typography fontSize={18} color={data.name ? "text.primary" : "text.secondary"}>
              {data.name ?? <i>(Item was deleted)</i>}
            </Typography>
            <Typography sx={{ fontSize: 14, marginLeft: 2 }} color="text.secondary">
              x{quantity}
            </Typography>
          </Stack>
          <Stack flexGrow={1} direction="row" justifyContent="flex-end" alignItems="flex-end">
            <Typography fontSize={14} color="text.secondary" variant="h5">
              {formatCurrency(price)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default DisplayConstItem;
