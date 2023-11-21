import { LoadingButton } from "@mui/lab";
import ConfirmationDialog from "../ConfirmationDialog";
import { FunctionComponent, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import useShoppingCart from "src/hooks/useShoppingCart";
import { showToast } from "src/utilities/toast";
import { useDeleteInventoryItem } from "src/hooks/useInventoryRequests";

interface DeleteInventoryItemProps {
  id: number;
  name: string;
}

const DeleteInventoryItem: FunctionComponent<DeleteInventoryItemProps> = ({ id, name }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const { getItemQuantity } = useShoppingCart();
  const {mutate, isLoading, isError, error} = useDeleteInventoryItem(id);
  const deleteItem = () => {
    const itemIsCurrentlyInCart = getItemQuantity(id) !== 0;
    if (itemIsCurrentlyInCart) {
      showToast(
        `Cannot delete '${name}' because it is in your shopping cart`,
      );
      return;
    }
    mutate();
  };
  if (isError){
    showToast(error, "error");
  }
  return (
    <>
      <LoadingButton
        onClick={() => setDeleteModalOpen(true)}
        endIcon={<DeleteIcon />}
        loading={isLoading}
        loadingPosition="end"
      >
        Delete
      </LoadingButton>
      <ConfirmationDialog
        title={`Delete '${name}'?`}
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onConfirm={() => deleteItem()}
      >
        Are you sure you want to delete this inventory item?
      </ConfirmationDialog>
    </>
  );
};

export default DeleteInventoryItem;
