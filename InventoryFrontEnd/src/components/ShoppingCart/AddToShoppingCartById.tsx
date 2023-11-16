import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useEffect, useState } from "react";
import {
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
} from "src/data/InventoryConstants";
import useInventoryRequest from "src/hooks/useInventoryRequest";
import useShoppingCart from "src/hooks/useShoppingCart";
import { showToast } from "src/utilities/toast";

interface AddToShoppingCartByIdProps {}

const AddToShoppingCartById: FunctionComponent<
  AddToShoppingCartByIdProps
> = () => {
  const [itemId, setItemId] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const inventoryRequest = useInventoryRequest();
  const {addToCart} = useShoppingCart();
  const { isLoading, refetch } = useQuery({
    queryKey: [INVENTORY_REACT_QUERY_KEY, `${itemId}`],
    queryFn: async () => {
      const res = await inventoryRequest.get(`${INVENTORY_LIST_API}/${itemId}`);
      if (res.status == 204) {
        showToast(`Item ID ${itemId} is not a valid item`);
        setIsError(true);
      } else if (!res.data) {
        showToast("There was no data from the server response");
        setIsError(true);
      } else {
        setItemId("")
        addToCart(res.data.itemId, res.data.cost)
      }
      return res;
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const submit = (e) => {
    e.preventDefault();
    if (itemId != "")
      refetch();

  };
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={submit}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <TextField
          required
          error={isError}
          disabled={isLoading}
          value={itemId}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === ""){
              setIsError(false);
            }
            setItemId(event.target.value.replace(/[^0-9]/g, ""));
          }}
          label="Add an Item by ID"
        />
        <LoadingButton type="submit" loading={isLoading} variant="contained">
          Enter
        </LoadingButton>
      </Box>
    </>
  );
};

export default AddToShoppingCartById;
