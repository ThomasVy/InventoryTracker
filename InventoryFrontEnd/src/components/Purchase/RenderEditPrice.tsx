import { Box, Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import CurrencyInput from "../CurrencyInput";
import { Mode } from "./RenderItemPrice";

interface RenderEditPriceProps {
  totalPrice: number;
  setTotalPrice: (newTotalPrice: number) => void;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  editBoxWidth: number;
}

const RenderEditPrice: FunctionComponent<
  RenderEditPriceProps
> = ({ totalPrice, setTotalPrice, setMode, editBoxWidth }) => {
  const [customPrice, setCustomPrice] = useState<string>(totalPrice.toFixed(2));  

  const handleSubmit = (event) => {
    event.preventDefault();
    setTotalPrice(parseFloat(customPrice))
    setMode("Normal");
  };

  return (
    <>
      <Box
        component="form"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
        onSubmit={handleSubmit}
      >
        <Button onClick={() => setMode("Normal")} color="error">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
        <CurrencyInput
          textFieldProps={{
            inputProps: { style: { width: editBoxWidth, fontSize: 20, textAlign: "right" } },
            autoFocus: true,
            onFocus: (e) => e.target.select(),
          }}
          setInput={setCustomPrice}
          input={customPrice}
        />
      </Box>
    </>
  );
};

export default RenderEditPrice;
