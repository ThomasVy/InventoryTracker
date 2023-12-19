import useAuthPrivateRequest from "./usePrivateRequest";
import backendRequest from "../api/backendRequest";
import { UndefinedInitialDataOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PURCHASE_API, PURCHASE_LIST_KEY, PurchaseItemDetails, PurchaseOrder } from "src/data/PurchaseConstants";
import { AxiosError } from "axios";
import { PaginationResults } from "src/data/PaginationConstants";

export function useSendPurchaseOrder(onSuccessFunc: (id: number) => void, onErrorFunc: (error: string) => void) {
  const privatePurchaseRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (purchaseOrder: PurchaseItemDetails[]) => {
      return privatePurchaseRequest.post(
        PURCHASE_API,
        JSON.stringify({ purchaseOrder })
      );
    },
    onSuccess: (data) => {
      if (data?.data) {
        queryClient.invalidateQueries({
          queryKey: [PURCHASE_LIST_KEY],
        });
        const { purchaseId } = data?.data;
        onSuccessFunc(purchaseId);
      } else {
        onErrorFunc("No data was sent back");
      }
    },
    onError: (error: Error) => {
      onErrorFunc(JSON.stringify(error));
    },
  });

  return { mutate, isLoading: isPending };
}

export function useGetPurchaseHistory(page: number, limit: number, searchTerm: string) {
  const privatePurchaseRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      PURCHASE_LIST_KEY,
      {
        page,
        limit,
        searchTerm
      },
    ],
    queryFn: () => {
      return privatePurchaseRequest.get<PaginationResults<{id: number}>>(PURCHASE_API, {
        params: {
          page,
          limit,
          searchTerm
        },
      });
    },
  });
  
  return {
    isLoading,
    isError,
    error: JSON.stringify(error),
    statusCode: data?.status,
    data: data?.data
  };
}

export function useGetIndividualPurchaseOrder(id: number, option?: Partial<UndefinedInitialDataOptions>) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: [PURCHASE_LIST_KEY, id],
    queryFn: () => {
      return privateInventoryRequest.get(`${PURCHASE_API}/${id}`);
    },
    ...option,
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

export function useUpdatePurchase(id: number, onSuccessFunc: (id: number) => void, onErrorFunc: (error: string) => void) {
  const privatePurchaseRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (purchaseOrder: PurchaseOrder) => {
      return privatePurchaseRequest.put(
        `${PURCHASE_API}/${id}`,
        JSON.stringify({ purchaseOrder })
      );
    },
    onSuccess: (data) => {
      if (data?.data) {
        queryClient.invalidateQueries({ queryKey: [PURCHASE_LIST_KEY] })
        const { purchaseId } = data?.data;
        onSuccessFunc(purchaseId);
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

export function useDeletePurchase(id: number, onSuccessFunc: (id: number) => void, onErrorFunc: (error: string) => void) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: () => {
      return privateInventoryRequest.delete(`${PURCHASE_API}/${id}`);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [PURCHASE_LIST_KEY],
        }),
        queryClient.removeQueries({
          queryKey: [PURCHASE_LIST_KEY, id],
        }),
      ])
      onSuccessFunc(id);
    },
    onError: (error: AxiosError) => {
      onErrorFunc(error.response?.data?.message);
    },
  });

  return { mutate, isLoading };
}