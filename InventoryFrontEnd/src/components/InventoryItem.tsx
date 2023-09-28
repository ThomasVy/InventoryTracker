import { FunctionComponent } from "react";
import { InventoryItemDetails } from "../data/InventoryConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import "../assets/InventoryItem.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "react-query";
import { INVENTORY_LIST_API, INVENTORY_REACT_QUERY_KEY } from "../data/InventoryConstants";

const InventoryItem: FunctionComponent<InventoryItemDetails> = ({id, name, stock, cost, reference}) => {
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
       mutationFn :  () => {
            return axios.delete(`${INVENTORY_LIST_API}/${id}`);
       },
       onSuccess: () => {
            queryClient.invalidateQueries(INVENTORY_REACT_QUERY_KEY);
       }
       
    });

    const handleDeleteItem = () => {
        deleteMutation.mutate();
    }
    
    return (  
        <>
            <div>
                <span>{name}</span> | 
                <span>{stock}</span> | 
                <span>{cost}</span> |
                {reference && <span>{reference}</span> } |
                { 
                deleteMutation.isLoading ? 
                <FontAwesomeIcon icon={faSpinner} spin /> : 
                <FontAwesomeIcon className="delete-icon" onClick={handleDeleteItem} icon={faTrashCan}></FontAwesomeIcon>
                }
            </div>
        </>
    );
}
 
export default InventoryItem;