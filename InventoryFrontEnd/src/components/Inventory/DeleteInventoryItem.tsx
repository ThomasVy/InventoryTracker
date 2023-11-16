import { LoadingButton } from "@mui/lab";
import ConfirmationDialog from "../ConfirmationDialog";
import { FunctionComponent, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShoppingCart from "src/hooks/useShoppingCart";
import { showToast } from "src/utilities/toast";
import useInventoryRequest from "src/hooks/useInventoryRequest";
import {
  INVENTORY_ALL_REACT_QUERY_KEY,
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
} from "src/data/InventoryConstants";

interface DeleteInventoryItemProps {
  id: number;
  name: string;
}

const DeleteInventoryItem: FunctionComponent<DeleteInventoryItemProps> = ({ id, name }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const inventoryRequest = useInventoryRequest();
  const queryClient = useQueryClient();
  const { getItemQuantity } = useShoppingCart();

  const deleteMutation = useMutation({
    mutationFn: () => {
      return inventoryRequest.delete(`${INVENTORY_LIST_API}/${id}`);
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [INVENTORY_ALL_REACT_QUERY_KEY],
        }),
        queryClient.removeQueries({
          queryKey: [INVENTORY_REACT_QUERY_KEY, `${id}`],
        }),
      ]),
  });
  const deleteItem = () => {
    const itemIsCurrentlyInCart = getItemQuantity(id) !== 0;
    if (itemIsCurrentlyInCart) {
      showToast(
        `Cannot delete '${name}' because it is in your shopping cart`,
      );
      return;
    }
    deleteMutation.mutate();
  };
  return (
    <>
      <LoadingButton
        onClick={() => setDeleteModalOpen(true)}
        endIcon={<DeleteIcon />}
        loading={deleteMutation.isPending}
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
