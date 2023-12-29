import useAuthPrivateRequest from "./usePrivateRequest";
import backendRequest from "../api/backendRequest";
import { UndefinedInitialDataOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  INVENTORY_ADD_API,
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
  InventoryMini,
  InventoryItemDetails,
  InventoryItemsWithoutId,
} from "src/data/InventoryConstants";
import { AxiosError } from "axios";
import { PaginationResults, SearchReturn } from "src/data/PaginationConstants";

export function useGetInventory(page: number, limit: number, search: string): SearchReturn<InventoryMini> {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      INVENTORY_REACT_QUERY_KEY,
      {
        page,
        limit,
        search
      },
    ],
    queryFn: () => {
      return privateInventoryRequest.get<PaginationResults<InventoryMini>>(INVENTORY_LIST_API, {
        params: {
          page,
          limit,
          payload:{search}
        },
      });
    },
  });

  return {
    isLoading,
    isError,
    error: JSON.stringify(error),
    statusCode: data?.status,
    results: data?.data
  };
}

export function useAddInventoryItem(
  onSuccessFunc: () => void,
  onErrorFunc: (error: string) => void
) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (item: InventoryItemsWithoutId) => {
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
    onError: (error: AxiosError) => {
      onErrorFunc(error.response?.data.message);
    },
  });

  return { mutate, isPending };
}

export function useGetInventoryItem(id: string, option?: Partial<UndefinedInitialDataOptions>) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: [INVENTORY_REACT_QUERY_KEY, id],
    queryFn: async () => {
      return privateInventoryRequest.get<InventoryItemDetails>(`${INVENTORY_LIST_API}/${id}`);
    },
    ...option
  });
  const axiosData = data?.data;
  return {
    isLoading,
    refetch,
    isError,
    error: JSON.stringify(error),
    data: axiosData
  };
}


export function useSearchInventoryTag(tag: string | undefined, onSuccessFunc: (data: InventoryItemDetails | undefined, statusCode: number) => void) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, refetch } = useQuery({
    queryKey: [INVENTORY_REACT_QUERY_KEY, tag],
    queryFn: async () => {
      const res = await privateInventoryRequest.get<InventoryItemDetails>(`${INVENTORY_LIST_API}/tag/${tag}`);
      onSuccessFunc(res.data, res.status);
      return res;
    },
    enabled: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  return {
    isLoading,
    refetch,
  };
}

export function useDeleteInventoryItem(id: string, onSuccessFunc: () => void, onErrorFunc: (error: string) => void) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => {
      return privateInventoryRequest.delete(`${INVENTORY_LIST_API}/${id}`);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [INVENTORY_REACT_QUERY_KEY],
        }),
        queryClient.removeQueries({
          queryKey: [INVENTORY_REACT_QUERY_KEY, id],
        }),
      ]);
      onSuccessFunc();
    },
    onError: (error: AxiosError) => {
      onErrorFunc(error.response?.data?.message);
    },
    
  });

  return { mutate, isLoading: isPending, isError, error: JSON.stringify(error) };
}

export function useUpdateInventory(id: string, onSuccessFunc: (id: string) => void, onErrorFunc: (error: string) => void) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (item: InventoryItemsWithoutId) => {
      return privateInventoryRequest.put(
        `${INVENTORY_LIST_API}/${id}`,
        JSON.stringify({ item })
      );
    },
    onSuccess: (data) => {
      if (data?.data) {
        queryClient.invalidateQueries({ queryKey: [INVENTORY_REACT_QUERY_KEY] })
        const { id } = data?.data;
        onSuccessFunc(id);
      } else {
        onErrorFunc("No data was sent back");
      }
    },
    onError: (error: AxiosError) => {
      onErrorFunc(error.response?.data?.message);
    },
  });

  return { mutate, isLoading: isPending };
}