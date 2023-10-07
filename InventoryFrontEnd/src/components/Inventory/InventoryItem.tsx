import { FunctionComponent } from "react";
import { InventoryItemDetails } from "../../data/InventoryConstants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "react-query";
import {
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
} from "../../data/InventoryConstants";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Divider, Stack, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { INVENTORY_LINK } from "src/data/LinkConstants";

const InventoryItem: FunctionComponent<InventoryItemDetails> = ({
  id,
  name,
  stock,
  cost,
  reference,
}) => {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deleteMutation = useMutation({
    mutationFn: () => {
      return axios.delete(`${INVENTORY_LIST_API}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([INVENTORY_REACT_QUERY_KEY]);
    },
  });

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="left">{stock}</TableCell>
        <TableCell align="left">{cost}</TableCell>
        <TableCell align="left">{reference ? reference : "-"}</TableCell>
        <TableCell align="left">
          <LoadingButton
            onClick={() => navigate(`${INVENTORY_LINK.link}/${id}/edit`)}
            endIcon={<EditIcon />}
            loading={deleteMutation.isLoading}
            loadingPosition="end"
          >
            Edit
          </LoadingButton>
          <LoadingButton
            onClick={() => deleteMutation.mutate()}
            endIcon={<DeleteIcon />}
            loading={deleteMutation.isLoading}
            loadingPosition="end"
          >
            Delete
          </LoadingButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default InventoryItem;
