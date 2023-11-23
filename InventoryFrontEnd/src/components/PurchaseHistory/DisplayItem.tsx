import { Stack, Box, Typography, CircularProgress } from "@mui/material";
import { FunctionComponent } from "react";
import { useGetInventoryItem } from "src/hooks/useInventoryRequests";
import { formatCurrency } from "src/utilities/formatCurrency";

interface DisplayItemProps {
  id: number;
  quantity: number;
  individualPrice: number;
}

const DisplayItem: FunctionComponent<DisplayItemProps> = ({
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
          <Typography sx={{ fontSize: 14.5, marginRight: 2 }} color="text.secondary">
            {quantity}x 
          </Typography>
          <Typography fontSize={18} color="text.secondary">
            {name}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default DisplayItem;
