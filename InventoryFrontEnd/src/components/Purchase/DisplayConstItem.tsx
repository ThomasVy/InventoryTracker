import { Stack, Box, Typography, CircularProgress } from "@mui/material";
import { FunctionComponent } from "react";
import { PurchaseItemDetails } from "src/data/PurchaseConstants";
import { useGetInventoryItem } from "src/hooks/useInventoryRequests";


const DisplayConstItem: FunctionComponent<Omit<PurchaseItemDetails, "price">> = ({
  id,
  quantity,
}) => {
    const {name, imageLink, isLoading, isError, error} = useGetInventoryItem(id);
    if (isLoading) return <CircularProgress />;
    if (isError) {
      console.log(`Item doesn't ${error}`);
      return null;
    }
  return (
    <>
      <Stack
        direction="row"
        gap={3}
        alignItems="center"
        marginY={1}
      >
        <Box
          component="img"
          alt="No Image"
          src={imageLink}
          style={{ width: "130px", aspectRatio: 3 / 2, objectFit: "contain" }}
        />
        <Stack
          flexDirection="row"
          justifyContent="center"
          justifyItems="center"
          alignContent="center"
          alignItems="center"
        >
          <Typography fontSize={18} color="text.secondary">
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14.5, marginLeft: 2 }} color="text.secondary">
            x{quantity} 
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default DisplayConstItem;
