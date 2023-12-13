import { LoadingButton } from '@mui/lab'
import { PurchaseOrder } from 'src/data/PurchaseConstants'
import { useUpdatePurchase } from 'src/hooks/usePurchaseRequests'
import { showToast } from 'src/utilities/toast'

type Props = {
    purchaseId: number,
    isDirty: boolean,
    setDirty: (value: boolean) => void,
    purchaseHistoryState: PurchaseOrder
}

const SaveEditPurchaseButton = ({ purchaseId, isDirty, setDirty, purchaseHistoryState }: Props) => {
    const onSuccessFunc = (id: number) => {
        setDirty(false);
        showToast(`Successfully updated purchase order ${id}`, "success");
    }
    const onErrorFunc = (error: string) => {
        showToast(error, "error");
    }
    const { mutate, isLoading } = useUpdatePurchase(purchaseId, onSuccessFunc, onErrorFunc)
    const handleSave = () => {
        mutate(purchaseHistoryState);
    }
    return (
        <LoadingButton
            onClick={handleSave}
            loading={isLoading}
            variant="contained"
            disabled={!isDirty}
        >
            Save
        </LoadingButton>
    )
}

export default SaveEditPurchaseButton;