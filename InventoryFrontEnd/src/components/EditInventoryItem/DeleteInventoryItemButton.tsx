import { FunctionComponent } from "react";
import useShoppingCart from "src/hooks/useShoppingCart";
import { showToast } from "src/utilities/toast";
import { useDeleteInventoryItem } from "src/hooks/useInventoryRequests";
import ConfirmationButton from "../ConfirmationButton";
import { useNavigate } from "react-router-dom";
import { INVENTORY_LINK } from "src/data/LinkConstants";

interface DeleteInventoryItemButtonProps {
  id: number;
}

const DeleteInventoryItemButton: FunctionComponent<DeleteInventoryItemButtonProps> = ({ id }) => {
  const { getItemQuantity } = useShoppingCart();
  const navigate = useNavigate();
  const onSuccess = () => {
    showToast(`Successfully deleted item ${id}`, "success");
    navigate(INVENTORY_LINK.link);
  };
  const onError = (error: string) => {
    showToast(`Failed to delete\n ${error}`, "error");
  };
  const { mutate, isLoading, isError, error } = useDeleteInventoryItem(id, onSuccess, onError);
  const deleteItem = () => {
    const itemIsCurrentlyInCart = getItemQuantity(id) !== 0;
    if (itemIsCurrentlyInCart) {
      showToast(
        `Cannot delete item id ${id} because it is in your shopping cart`,
      );
      return;
    }
    mutate();
  };

  if (isError) {
    showToast(error, "error");
  }
  return (
    <>
      <ConfirmationButton
        dialogTitle="Delete Confirmation"
        dialogContent="Are you sure you want to delete this inventory item?"
        onConfirm={() => deleteItem()}
        buttonInfo={
          {
            type: "Loading",
            isLoading: isLoading,
            props: {
              color: "error",
              variant: "contained",
            }
          }
        }
      >
        Delete
      </ConfirmationButton>
    </>
  );
};

export default DeleteInventoryItemButton;
