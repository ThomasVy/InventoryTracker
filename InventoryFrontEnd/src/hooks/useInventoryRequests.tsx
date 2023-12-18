import useAuthPrivateRequest from "./usePrivateRequest";
import backendRequest from "../api/backendRequest";
import { UndefinedInitialDataOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  INVENTORY_ADD_API,
  INVENTORY_LIST_API,
  INVENTORY_REACT_QUERY_KEY,
  InventoryItemDetails,
} from "src/data/InventoryConstants";
import { AxiosError } from "axios";

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

export function useGetInventoryItem(id: number, option?: Partial<UndefinedInitialDataOptions>) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: [INVENTORY_REACT_QUERY_KEY, id],
    queryFn: async () => {
      return privateInventoryRequest.get(`${INVENTORY_LIST_API}/${id}`);
    },
    ...option
  });
  const statusCode = data?.status ?? error?.response.status;
  const axiosData = data?.data;
  return {
    isLoading,
    refetch,
    isError,
    error: JSON.stringify(error),
    statusCode,
    data: axiosData
  };
}


export function useSearchInventoryItem(id: number, onSuccessFunc?: (statusCode: number, res: any | undefined) => void) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, refetch } = useQuery({
    queryKey: [INVENTORY_REACT_QUERY_KEY, id],
    queryFn: async () => {
      const res = await privateInventoryRequest.get(`${INVENTORY_LIST_API}/${id}`);
      if (onSuccessFunc) onSuccessFunc(res.status, res.data);
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

export function useDeleteInventoryItem(id: number, onSuccessFunc: () => void, onErrorFunc: (error: string) => void) {
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

export function useUpdateInventory(id: number, onSuccessFunc: (id: number) => void, onErrorFunc: (error: string) => void) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (item: InventoryItemDetails) => {
      return privateInventoryRequest.put(
        `${INVENTORY_LIST_API}/${id}`,
        JSON.stringify({ item })
      );
    },
    onSuccess: (data) => {
      if (data?.data) {
        queryClient.invalidateQueries({ queryKey: [INVENTORY_REACT_QUERY_KEY] })
        const { itemId } = data?.data;
        onSuccessFunc(itemId);
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