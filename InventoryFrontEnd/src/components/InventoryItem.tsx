import { FunctionComponent } from "react";
import { InventoryItemDetails } from "../data/InventoryConstants";

const InventoryItem: FunctionComponent<InventoryItemDetails> = ({name, stock, cost, reference}) => {
    return (  
        <>
            <div>
                <span>{name}</span> | 
                <span>{stock}</span> | 
                <span>{cost}</span> |
                {reference && <span>{reference}</span>}
            </div>
        </>
    );
}
 
export default InventoryItem;