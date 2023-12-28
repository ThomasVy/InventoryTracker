import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { InventoryItemDetails, InventoryMini } from "src/data/InventoryConstants";
import { useGetInventory, useSearchInventoryTag } from "src/hooks/useInventoryRequests";
import { showToast } from "src/utilities/toast";
import SearchDropDown from "./SearchDropDown";

interface AddByIdInputProps {
  addFunc : (id: string, cost: number) => void;
}

const AddByIdInput: FunctionComponent<
  AddByIdInputProps
> = ({addFunc}) => {
  const [tag, setTag] = useState<InventoryMini|null>(null);
  const onSuccessFunc = (data: InventoryItemDetails | undefined, statusCode: number) => {
    if (statusCode == 204) {
      showToast(`Item tag ${tag} is not a valid`);
    } else if (!data) {
      showToast("There was no data from the server response");
    } else {
      addFunc(data.id, data.cost)
      setTag(null)
    }
  }
  const {isLoading, refetch} = useSearchInventoryTag(tag?.tag, onSuccessFunc);

  const submit = (e) => {
    e.preventDefault();
    if (tag === null) {
      showToast("Item doesn't exist", "error");
      return;
    }
    refetch();
  };

  const displayOptions = (option: InventoryMini) => {
    return (
      <>
      {option.tag}
        <Typography variant="body2" color="text.secondary">
            {option.name}
        </Typography>
      </>
    );
  };
  const displaySelected = (option: InventoryMini) => {
    return option.tag
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={submit}
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <SearchDropDown 
          displayOptions={displayOptions}
          displaySelectedItem={displaySelected}
          searchHook={useGetInventory}
          setValue={setTag}
          value={tag}
        />
        <LoadingButton type="submit" loading={isLoading} variant="contained">
          Add
        </LoadingButton>
      </Box>
    </>
  );
};

export default AddByIdInput;
