import { FunctionComponent } from "react";
import useShoppingCart from "src/hooks/useShoppingCart";
import { showToast } from "src/utilities/toast";
import { useDeleteInventoryItem } from "src/hooks/useInventoryRequests";
import ConfirmationButton from "../ConfirmationButton";

interface DeleteInventoryItemProps {
  id: number;
  name: string;
}

const DeleteInventoryItem: FunctionComponent<DeleteInventoryItemProps> = ({ id, name }) => {
  const { getItemQuantity } = useShoppingCart();
  const { mutate, isLoading, isError, error } = useDeleteInventoryItem(id);
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
  if (isError) {
    showToast(error, "error");
  }
  return (
    <>
      <ConfirmationButton
        dialogTitle={`Delete '${name}'?`}
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

export default DeleteInventoryItem;
