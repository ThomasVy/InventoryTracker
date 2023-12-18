import { useDeletePurchase } from 'src/hooks/usePurchaseRequests';
import ConfirmationButton from '../ConfirmationButton';
import { showToast } from 'src/utilities/toast';
import { useNavigate } from 'react-router-dom';
import { PURCHASE_HISTORY_LINK } from 'src/data/LinkConstants';

type DeleteEditPurchaseButtonProps = {
    purchaseId: number
};
function DeleteEditPurchaseButton({purchaseId}: DeleteEditPurchaseButtonProps) {
    const navigate = useNavigate();
    const successFunc = () => {
        showToast(`Successfully deleted purchase id ${purchaseId}`, "success");
        navigate(PURCHASE_HISTORY_LINK.link );
    }
    const errorFunc = (error: string) => {
        showToast(`Failed to delete\n ${error}`, "error");
    }
    const {mutate, isLoading} = useDeletePurchase(purchaseId, successFunc, errorFunc);
    return (
        <>
            <ConfirmationButton
                dialogTitle="Delete Confirmation"
                dialogContent={`Are you sure you want to delete purchase id ${purchaseId}`}
                onConfirm={mutate}
                buttonInfo={{
                    type: "Loading",
                    isLoading,
                    props: {
                        variant:"contained",
                        color: "error"
                    }
                }}
            >
                Delete
            </ConfirmationButton>
        </>
    );
}
export default DeleteEditPurchaseButton;