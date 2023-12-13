import useAuthPrivateRequest from "./usePrivateRequest";
import backendRequest from "../api/backendRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  INVENTORY_ADD_API,
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
  InventoryItemDetails,
} from "src/data/InventoryConstants";

export function useGetInventory(page: number, limit: number) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      INVENTORY_REACT_QUERY_KEY,
      {
        page,
        limit,
      },
    ],
    queryFn: () => {
      return privateInventoryRequest.get(INVENTORY_LIST_API, {
        params: {
          page: page,
          limit: limit,
        },
      });
    },
  });
  const statusCode = data?.data;
  const results = data?.data.results;
  const previousPage = data?.data.previousPage;
  const nextPage = data?.data.nextPage;
  const maxPage = data?.data.maxPage;
  const totalItems = data?.data.totalItems;

  return {
    isLoading,
    isError,
    error: JSON.stringify(error),
    statusCode,
    results,
    previousPage,
    nextPage,
    maxPage,
    totalItems,
  };
}

export function useAddInventoryItem(
  onSuccessFunc: () => void,
  onErrorFunc: (error: string) => void
) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (item: InventoryItemDetails) => {
      return privateInventoryRequest.post(
        INVENTORY_ADD_API,
        JSON.stringify(item)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [INVENTORY_REACT_QUERY_KEY],
      });
      onSuccessFunc();
    },
    onError: (error: Error) => {
      onErrorFunc(JSON.stringify(error));
    },
  });

  return { mutate, isPending };
}

export function useGetInventoryItem(id: number, enableInitialFetch: boolean = true, onSuccessFunc?: (statusCode: number, res: any | undefined) => void) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: [INVENTORY_REACT_QUERY_KEY, id],
    queryFn: async () => {
      const res = await privateInventoryRequest.get(`${INVENTORY_LIST_API}/${id}`);
      if (onSuccessFunc) onSuccessFunc(res.status, res.data);
      return res;
    },
    enabled: enableInitialFetch,
    refetchOnWindowFocus: enableInitialFetch,
  });
  const statusCode = data?.status;
  const name = data?.data.name;
  const reference = data?.data.reference;
  const type = data?.data.type;
  const stock = data?.data.stock;
  const cost = data?.data.cost;
  const owner = data?.data.owner;
  const imageLink = data?.data.imageLink;
  return {
    isLoading,
    refetch,
    isError,
    error: JSON.stringify(error),
    statusCode,
    name,
    reference,
    type,
    stock,
    cost,
    owner,
    imageLink
  };
}

export function useDeleteInventoryItem(id: number) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();
  const {mutate, isPending, isError, error}= useMutation({
    mutationFn: () => {
      return privateInventoryRequest.delete(`${INVENTORY_LIST_API}/${id}`);
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [INVENTORY_REACT_QUERY_KEY],
        }),
        queryClient.removeQueries({
          queryKey: [INVENTORY_REACT_QUERY_KEY, `${id}`],
        }),
      ]),
  });
  
  return {mutate, isLoading: isPending, isError, error: JSON.stringify(error)};
}
