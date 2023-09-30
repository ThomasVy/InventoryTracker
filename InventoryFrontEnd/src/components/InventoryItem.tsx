import { FunctionComponent } from "react";
import { InventoryItemDetails } from "../data/InventoryConstants";
import "../assets/InventoryItem.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "react-query";
import {
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
} from "../data/InventoryConstants";
import LoadingComponent from "./LoadingComponent";
import DeleteIcon from '@mui/icons-material/Delete';

const InventoryItem: FunctionComponent<InventoryItemDetails> = ({
  id,
  name,
  stock,
  cost,
  reference,
}) => {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => {
      return axios.delete(`${INVENTORY_LIST_API}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(INVENTORY_REACT_QUERY_KEY);
    },
  });

  const handleDeleteItem = () => {
    deleteMutation.mutate();
  };

  return (
    <>
      <div>
        <span>{name}</span> |<span>{stock}</span> |<span>{cost}</span> |
        {reference && <span>{reference}</span>} |
        <LoadingComponent
          isLoading={deleteMutation.isLoading}
          alt={
            <DeleteIcon onClick={handleDeleteItem} />
          }
        />
      </div>
    </>
  );
};

export default InventoryItem;
