import { FunctionComponent, useState } from "react";
import useShoppingCart from "src/hooks/useShoppingCart";
import { showToast } from "src/utilities/toast";
import { useDeleteInventoryItem } from "src/hooks/useInventoryRequests";
import ConfirmationButton from "../ConfirmationButton";
import { useNavigate } from "react-router-dom";
import { INVENTORY_LINK } from "src/data/LinkConstants";
import ConfirmationDialog from "../ConfirmationDialog";
import { getPurchasesWithItem } from "src/utilities/purchasesRequests";
import useAuthPrivateRequest from "src/hooks/usePrivateRequest";
import backendRequest from "src/api/backendRequest";
interface DeleteInventoryItemButtonProps {
  id: string;
}
const PURCHASE_CONFLICT_MESSAGE = "This item is in other purchases. \
Deleting this item will result in the following purchases to contain an invalid item:"

const ITEM_IN_CART_CONFLICT_MESSAGE = "Item is in your shopping cart. \
It will be removed from the cart if this item is deleted."

type ConflictDialogState = {
  message: JSX.Element,
  openDialog: boolean
};

const DeleteInventoryItemButton: FunctionComponent<DeleteInventoryItemButtonProps> = ({ id }) => {
  const { getItemQuantity, removeFromCart } = useShoppingCart();
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const navigate = useNavigate();
  const [conflictDialogState, setConflictDialogState] = useState<ConflictDialogState>({ message: <>""</>, openDialog: false });
  const onSuccess = () => {
    showToast(`Successfully deleted item ${id}`, "success");
    navigate(INVENTORY_LINK.link);
  };
  const onError = (error: string) => {
    showToast(`Failed to delete\n ${error}`, "error");
  };
  const { mutate, isLoading, isError, error } = useDeleteInventoryItem(id, onSuccess, onError);

  const handleDeleteItem = () => {
    removeFromCart(id);
    mutate();
  }

  const checkConflict = async () => {
    const itemIsCurrentlyInCart = getItemQuantity(id) !== 0;
    if (itemIsCurrentlyInCart) {
      setConflictDialogState(
        {
          message: (<>{ITEM_IN_CART_CONFLICT_MESSAGE}</>),
          openDialog: true
        });
      return;
    }
    const results = await getPurchasesWithItem(privateInventoryRequest, id, 0, -1);
    if (results.results != null && results.results.length > 0) {
      setConflictDialogState(
        {
          message: (<>
            {PURCHASE_CONFLICT_MESSAGE}
            {results.results.map((purchase) => {
              return (
                <li key={purchase.id}>
                  {purchase.id}
                </li>
              );
            })}
          </>),
          openDialog: true
        });
      return;
    }
    handleDeleteItem();
  };

  if (isError) {
    showToast(error, "error");
  }
  return (
    <>
      <ConfirmationButton
        dialogTitle="Delete Confirmation"
        dialogContent="Are you sure you want to delete this inventory item?"
        onConfirm={() => checkConflict()}
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
      <ConfirmationDialog
        onConfirm={handleDeleteItem}
        open={conflictDialogState.openDialog}
        setOpen={(state: boolean) => setConflictDialogState((prev) => ({ ...prev, openDialog: state }))}
      >
        {conflictDialogState.message}
        <br/>Are you sure you want to continue?
      </ConfirmationDialog>

    </>
  );
};

export default DeleteInventoryItemButton;
