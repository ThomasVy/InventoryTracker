import { LoadingButton } from "@mui/lab";
import { FunctionComponent } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { ShoppingCartItem } from "src/context/ShoppingCartProvider";
import { showToast } from "src/utilities/toast";
import { useSendPurchaseOrder } from "src/hooks/usePurchaseRequests";
import { PurchaseOrder } from "src/data/PurchaseConstants";

interface SubmitPurchaseOrderButtonProps {
    shoppingCart : ShoppingCartItem[];
    clearShoppingCart: () => void;
    collectPurchaseOrder: () => PurchaseOrder;
}
 
const SubmitPurchaseOrderButton: FunctionComponent<SubmitPurchaseOrderButtonProps> = ({shoppingCart, clearShoppingCart, collectPurchaseOrder}) => {
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
        mutate(collectPurchaseOrder());
    }
    return ( 
        <LoadingButton
        loading={isLoading}
        variant="contained"
        endIcon={<CheckIcon />}
        onClick={handleSubmit}
      >
        Submit
      </LoadingButton>
     );
}
 
export default SubmitPurchaseOrderButton;