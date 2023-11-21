import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useGetInventoryItem } from "src/hooks/useInventoryRequests";
import useShoppingCart from "src/hooks/useShoppingCart";
import { showToast } from "src/utilities/toast";

interface AddToShoppingCartByIdProps {}

const AddToShoppingCartById: FunctionComponent<
  AddToShoppingCartByIdProps
> = () => {
  const [itemId, setItemId] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const {addToCart} = useShoppingCart();
  const onSuccessFunc = (statusCode: number, res: any | undefined) => {
    if (statusCode == 204) {
      showToast(`Item ID ${itemId} is not a valid item`);
      setIsError(true);
    } else if (!res) {
      showToast("There was no data from the server response");
      setIsError(true);
    } else {
      setItemId("")
      addToCart(res.itemId, res.cost)
    }
  }
  const {isLoading, refetch} = useGetInventoryItem(parseInt(itemId), false, onSuccessFunc);

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
