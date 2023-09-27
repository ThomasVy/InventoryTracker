import { FunctionComponent, useRef } from "react";
import InputField from "../react_helpers/InputField";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { INVENTORY_ADD_API, INVENTORY_REACT_QUERY_KEY, InventoryItemDetails } from "../data/InventoryConstants";
interface AddInventoryProps {
}

const AddInventory: FunctionComponent<AddInventoryProps> = () => {
    const name = useRef<HTMLInputElement>();
    const stock = useRef<HTMLInputElement>();
    const cost = useRef<HTMLInputElement>();
    const reference = useRef<HTMLInputElement>();
    const axios = useAxiosPrivate();
    const queryClient = useQueryClient();

    const newItemMutation = useMutation({
       mutationFn :  (item : InventoryItemDetails ) => {
            return axios.post(INVENTORY_ADD_API, JSON.stringify(item));
       },
       onSuccess: () => {
        queryClient.invalidateQueries(INVENTORY_REACT_QUERY_KEY);
       }
       
    });
    const handleAddInventory = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!name.current) return;
        if (!stock.current) return;
        if (!cost.current) return;
        if (!reference.current) return;

        newItemMutation.mutate({ 
            name: name.current?.value,
            stock: stock.current.valueAsNumber,
            cost: cost.current.valueAsNumber,
            reference: reference.current.value
        });
    }

    return ( 
        <div>
            <InputField ref={name} type="text" label="name"/>
            <InputField ref={stock} type="number" label="stock"/>
            <InputField ref={cost} type="number" label="cost"/>
            <InputField ref={reference}type="text" label="reference"/>
            <button disabled={newItemMutation.isLoading} onClick={(e) => handleAddInventory(e)}>Add Inventory</button>
        </div>

     );
}
 
export default AddInventory;