import { FunctionComponent, useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

import CurrencyInput from "../CurrencyInput";
import WholeNumberInput from "../WholeNumberInput";
import { showToast } from "src/utilities/toast";
import useAuth from "src/hooks/useAuth";
import { useAddInventoryItem } from "src/hooks/useInventoryRequests";
interface AddInventoryProps {}

const AddInventory: FunctionComponent<AddInventoryProps> = () => {
  const {auth} = useAuth();
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");
  const [cost, setCost] = useState("");
  const [reference, setReference] = useState("");
  const [productType, setProductType] = useState("Poster");
  const [owner, setOwner] = useState(auth ? auth.username : "");
  const onSuccessFunc = () => {
    setStock("");
    setCost("");
    setProductName("");
    setReference("");
    setOwner(auth ? auth.username : "");
    setProductType("Poster");
  }
  const onFailureFunc = (error: string) => {
    showToast(`Failed to Add ${error}`, "error");
  }
  const {mutate, isPending} = useAddInventoryItem(onSuccessFunc, onFailureFunc);
  const handleAddInventory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!productName) return;
    if (!stock) return;
    if (!cost) return;
    if (!reference) return;
    if (!productType) return;
    if (!owner) return;
    mutate({
      itemId: -1,
      name: productName,
      stock: parseInt(stock),
      cost: parseInt(cost),
      reference: reference,
      type: productType,
      owner: owner,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        label="Product Name"
      />
      <WholeNumberInput
        textFieldProps={{
          label: "Stock",
          required: true,
        }}
        setInput={setStock}
        input={stock}
      />
      <CurrencyInput
        textFieldProps={{
          label: "Cost",
          required: true,
        }}
        setInput={setCost}
        input={cost}
      />
      <TextField
        select
        required
        label="Product Type"
        value={productType}
        onChange={(e) => setProductType(e.target.value)}
      >
        <MenuItem value="Poster">Poster</MenuItem>
        <MenuItem value="Keychain">Keychain</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <TextField
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        label="Reference"
      />

      <TextField
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        label="Owner"
      />
      <LoadingButton
        onClick={(e) => handleAddInventory(e)}
        endIcon={<SendIcon />}
        loading={isPending}
        loadingPosition="end"
        sx={{
          height: 50,
        }}
      >
        Create Item
      </LoadingButton>
    </Box>
  );
};

export default AddInventory;
