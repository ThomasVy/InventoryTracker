import useAuthPrivateRequest from "./usePrivateRequest";
import inventoryRequest from "../api/inventoryRequest";

const useInventoryRequest = () => {
    return  useAuthPrivateRequest(inventoryRequest);
}

export default useInventoryRequest;