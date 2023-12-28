import { LoadingButton } from "@mui/lab";
import { FunctionComponent } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { showToast } from "src/utilities/toast";
import { useSendPurchaseOrder } from "src/hooks/usePurchaseRequests";
import { PurchaseItemDetails } from "src/data/PurchaseConstants";
import { useNavigate } from 'react-router-dom';
import { GetPurchaseEditLink, } from "src/data/LinkConstants";
import { Box } from "@mui/material";

interface SubmitPurchaseOrderButtonProps {
    shoppingCart : PurchaseItemDetails[];
    clearShoppingCart: () => void;
    closeCart: () => void;
}
 
const SubmitPurchaseOrderButton: FunctionComponent<SubmitPurchaseOrderButtonProps> = ({shoppingCart, clearShoppingCart, closeCart}) => {
    const navigate = useNavigate();
    const onSuccessSend = (id: string) => {
        const handleClick = () => {
          closeCart()
          navigate({ pathname: GetPurchaseEditLink(id) });
        }
        const display = <Box onClick={handleClick}>Successfully created purchase {id}</Box>
        showToast(display, "success");
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