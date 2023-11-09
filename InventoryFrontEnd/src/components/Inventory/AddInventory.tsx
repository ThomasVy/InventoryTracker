import { FunctionComponent, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  INVENTORY_ADD_API,
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
interface AddInventoryProps {}

const AddInventory: FunctionComponent<AddInventoryProps> = () => {
  const name = useRef<HTMLInputElement>();
  const stock = useRef<HTMLInputElement>();
  const cost = useRef<HTMLInputElement>();
  const reference = useRef<HTMLInputElement>();
  const type = useRef<HTMLInputElement>();

  const inventoryRequest = useInventoryRequest();
  const queryClient = useQueryClient();

  const newItemMutation = useMutation({
    mutationFn: (item: InventoryItemDetails) => {
      return inventoryRequest.post(INVENTORY_ADD_API, JSON.stringify(item));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [INVENTORY_REACT_QUERY_KEY], exact: true})

      name.current.value = "";
      stock.current.value = "";
      cost.current.value = "";
      reference.current.value = "";
      type.current.value = "Poster";
    },
  });
  const handleAddInventory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!name.current) return;
    if (!stock.current) return;
    if (!cost.current) return;
    if (!reference.current) return;
    if (!type.current) return;
    newItemMutation.mutate({
      itemId: -1,
      name: name.current?.value,
      stock: stock.current.valueAsNumber,
      cost: cost.current.valueAsNumber,
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
      <TextField required inputRef={stock} type="number" label="Stock" />
      <FormControl required fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="cost">Cost</InputLabel>
        <OutlinedInput
          id="cost"
          type="Number"
          inputRef={cost}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
      </FormControl>

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
