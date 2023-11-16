import { Box, Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import CurrencyInput from "../CurrencyInput";
import ConfirmationDialog from "../ConfirmationDialog";
import { Mode } from "./ShoppingCartItemPrice";

interface EditShoppingCartItemPriceProps {
  totalPrice: number;
  setTotalPrice: (newTotalPrice: number) => void;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  editBoxWidth: number;
}

const EditShoppingCartItemPrice: FunctionComponent<
  EditShoppingCartItemPriceProps
> = ({ totalPrice, setTotalPrice, setMode, editBoxWidth }) => {
  const [customPrice, setCustomPrice] = useState<string>(totalPrice.toFixed(2));  
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const handleConfirm = () => {
    setTotalPrice(parseFloat(customPrice))
    setMode("Normal");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (parseFloat(customPrice) !== totalPrice) {
        setOpenConfirmation(true);
    } else {
        setMode("Normal");
    }
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
      <ConfirmationDialog
        open={openConfirmation}
        setOpen={setOpenConfirmation}
        onConfirm={handleConfirm}
      >
        Are you sure you want to save {customPrice} as the total?
      </ConfirmationDialog>
    </>
  );
};

export default EditShoppingCartItemPrice;
