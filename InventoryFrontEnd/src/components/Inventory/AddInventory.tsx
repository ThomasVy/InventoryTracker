import { FunctionComponent, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  INVENTORY_ADD_API,
  INVENTORY_REACT_QUERY_KEY,
  InventoryItemDetails,
} from "../../data/InventoryConstants";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import useInventoryRequest from "src/hooks/useInventoryRequest";
interface AddInventoryProps {}

const AddInventory: FunctionComponent<AddInventoryProps> = () => {
  const name = useRef<HTMLInputElement>();
  const stock = useRef<HTMLInputElement>();
  const cost = useRef<HTMLInputElement>();
  const reference = useRef<HTMLInputElement>();
  const inventoryRequest = useInventoryRequest();
  const queryClient = useQueryClient();

  const newItemMutation = useMutation({
    mutationFn: (item: InventoryItemDetails) => {
      return inventoryRequest.post(INVENTORY_ADD_API, JSON.stringify(item));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(INVENTORY_REACT_QUERY_KEY);

      name.current.value = "";
      stock.current.value = "";
      cost.current.value = "";
      reference.current.value = "";
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

    newItemMutation.mutate({
      name: name.current?.value,
      stock: stock.current.valueAsNumber,
      cost: cost.current.valueAsNumber,
      reference: reference.current.value,
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
      <TextField required inputRef={name} label="Name" />
      <TextField required inputRef={stock} type="number" label="Stock" />
      <TextField required inputRef={cost} type="number" label="Cost" />
      <TextField inputRef={reference} label="Reference" />
      <LoadingButton
        onClick={(e) => handleAddInventory(e)}
        endIcon={<SendIcon />}
        loading={newItemMutation.isLoading}
        loadingPosition="end"
        sx={{
            height: 50
          }}
      >
        Add Inventory
      </LoadingButton>
    </Box>
  );
};

export default AddInventory;
