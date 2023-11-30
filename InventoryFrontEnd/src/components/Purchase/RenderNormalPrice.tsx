import { Button, Stack, Typography } from "@mui/material";
import { forwardRef } from "react";
import { formatCurrency } from "src/utilities/formatCurrency";
import { Mode } from "./RenderItemPrice";

interface RenderNormalPriceProps {
    totalPrice :number;
    setMode: React.Dispatch<React.SetStateAction<Mode>>
}

type Ref = HTMLSpanElement;
const RenderNormalPrice = forwardRef<Ref, RenderNormalPriceProps>(({totalPrice, setMode}, ref) => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        flexWrap="wrap"
      >
        <Button onClick={() => setMode("Edit")}>Edit</Button>
        <Typography fontSize={20} ref={ref} variant="h5">
          {formatCurrency(totalPrice)}
        </Typography>
      </Stack>
    </>
  );
});

export default RenderNormalPrice;
