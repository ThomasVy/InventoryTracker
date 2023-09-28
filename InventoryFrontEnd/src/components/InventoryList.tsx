import { FunctionComponent, useEffect, useState } from "react";
import InventoryItem from "../components/InventoryItem";
import { useQuery } from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { INVENTORY_LIST_API, INVENTORY_REACT_QUERY_KEY } from "../data/InventoryConstants";

interface InventoryListProps {
};
 
const InventoryList: FunctionComponent<InventoryListProps> = () => {
    const privateApi =  useAxiosPrivate();
    const inventoryQuery = useQuery({
        queryKey: [INVENTORY_REACT_QUERY_KEY],
        queryFn: () => privateApi.get(INVENTORY_LIST_API)
    });

    if (inventoryQuery.isLoading) return <h1>Loading...</h1>;
    if (inventoryQuery.isError) return <pre>{JSON.stringify(inventoryQuery.error)}</pre>;
    if (inventoryQuery.data?.status == 204) return <h3>No inventories available</h3>;
    return (
        <div>
            {inventoryQuery.data?.data.map((item) => (
                <InventoryItem 
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    stock={item.stock}
                    cost={item.cost}
                    reference={item.reference}
                />
            ))}
        </div>
    );
}
 
export default InventoryList;