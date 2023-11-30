import { LoadingButton } from "@mui/lab";
import { FunctionComponent } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { showToast } from "src/utilities/toast";
import { useSendPurchaseOrder } from "src/hooks/usePurchaseRequests";
import { PurchaseItemDetails } from "src/data/PurchaseConstants";

interface SubmitPurchaseOrderButtonProps {
    shoppingCart : PurchaseItemDetails[];
    clearShoppingCart: () => void;
}
 
const SubmitPurchaseOrderButton: FunctionComponent<SubmitPurchaseOrderButtonProps> = ({shoppingCart, clearShoppingCart}) => {
    const onSuccessSend = (id: number) => {
        showToast(`Successfully created purchase #${id}`, "success");
        clearShoppingCart();
    }
    const onFailureSend = (error : string) => {
        showToast(`Failed to send purchase order ${error}`, "error");
    }
    const {mutate, isLoading} = useSendPurchaseOrder(onSuccessSend, onFailureSend);
    const handleSubmit = () => {
        if (shoppingCart.length === 0) {
          showToast("Please add at least 1 item before submitting", "error");
          return;
        }
        mutate(shoppingCart);
    }
    return ( 
        <LoadingButton
        loading={isLoading}
        variant="contained"
        endIcon={<CheckIcon />}
        onClick={handleSubmit}
        disabled={shoppingCart.length === 0}
      >
        Submit
      </LoadingButton>
     );
}
 
export default SubmitPurchaseOrderButton;