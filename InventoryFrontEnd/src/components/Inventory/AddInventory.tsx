import { FunctionComponent, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  INVENTORY_ADD_API,
  INVENTORY_ALL_REACT_QUERY_KEY,
  INVENTORY_REACT_QUERY_KEY,
  InventoryItemDetails,
} from "../../data/InventoryConstants";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import useInventoryRequest from "src/hooks/useInventoryRequest";
import Alert from "../Alert";
import CurrencyInput from "../CurrencyInput";
import WholeNumberInput from "../WholeNumberInput";
interface AddInventoryProps {}

const AddInventory: FunctionComponent<AddInventoryProps> = () => {
  const name = useRef<HTMLInputElement>();
  const [stock, setStock] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const reference = useRef<HTMLInputElement>();
  const type = useRef<HTMLInputElement>();

  const inventoryRequest = useInventoryRequest();
  const queryClient = useQueryClient();

  const newItemMutation = useMutation({
    mutationFn: (item: InventoryItemDetails) => {
      return inventoryRequest.post(INVENTORY_ADD_API, JSON.stringify(item));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [INVENTORY_ALL_REACT_QUERY_KEY]})

      setStock("");
      setCost("");
      name.current.value = "";
      reference.current.value = "";
      type.current.value = "Poster";
    },
  });
  const handleAddInventory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!name.current) return;
    if (!stock) return;
    if (!cost) return;
    if (!reference.current) return;
    if (!type.current) return;
    newItemMutation.mutate({
      itemId: -1,
      name: name.current?.value,
      stock: parseInt(stock),
      cost: parseInt(cost),
      reference: reference.current.value,
      type: type.current.value,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {newItemMutation.isError && <Alert title="Add Error" message={JSON.stringify(newItemMutation.error)} severity="error"/>}
      <TextField required inputRef={name} label="Name" />
      <WholeNumberInput textFieldProps={{
            label: "Stock",
            required: true,
          }}
          setInput={setStock}
          input={stock} />
      <CurrencyInput textFieldProps={{
            label: "Cost",
            required: true,
          }}
          setInput={setCost}
          input={cost} />
      <TextField
        select
        required
        label="Type"
        defaultValue="Poster"
        inputRef={type}
      >
        <MenuItem value="Poster">Poster</MenuItem>
        <MenuItem value="Keychain">Keychain</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <TextField inputRef={reference} label="Reference" />
      <LoadingButton
        onClick={(e) => handleAddInventory(e)}
        endIcon={<SendIcon />}
        loading={newItemMutation.isLoading}
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
