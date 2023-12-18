import { useUpdateInventory } from "src/hooks/useInventoryRequests";
import ConfirmationButton from "../ConfirmationButton";
import { showToast } from "src/utilities/toast";
import { InventoryItemDetails } from "src/data/InventoryConstants";
import { useNavigate } from "react-router-dom";
import { INVENTORY_LINK } from '../../data/LinkConstants';

type SaveEditInventoryItemButtonProps = {
    id: number,
    isDirty: boolean,
    inventoryState: InventoryItemDetails
};
function SaveEditInventoryItemButton({id, isDirty, inventoryState}: SaveEditInventoryItemButtonProps) {
    const navigate = useNavigate();
    const onSuccessFunc = (id: number) => {
        showToast(`Successfully updated Item ID ${id}`, "success");
        navigate(INVENTORY_LINK.link);
    }
    const onErrorFunc = (error: string) => {
        showToast(`An error occured while updating: ${error}`, "success");
    }
    
    const {mutate, isLoading} = useUpdateInventory(id, onSuccessFunc, onErrorFunc);
    const handleConfirm = () => {
        mutate(inventoryState)
    };

    return (
        <>
        <ConfirmationButton
            dialogTitle="Save Inventory Item"
            dialogContent="Are you sure you want to save?"
            onConfirm={handleConfirm}
            shouldConfirmationDialogOpen={() => isDirty}
            buttonInfo={
                {
                    type: "Loading",
                    isLoading,
                    props: {
                        variant: 'contained',
                        disabled: !isDirty
                    }
                }
            }
        >
            Save
        </ConfirmationButton>
        </>
    );
}
export default SaveEditInventoryItemButton;