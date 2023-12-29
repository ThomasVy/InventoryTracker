import useAuthPrivateRequest from "./usePrivateRequest";
import backendRequest from "../api/backendRequest";
import { UndefinedInitialDataOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PURCHASE_API, PURCHASE_LIST_KEY, PurchaseItemDetails, PurchaseMini, PurchaseOrder } from "src/data/PurchaseConstants";
import { AxiosError } from "axios";
import { PaginationResults, SearchReturn } from "src/data/PaginationConstants";
import { getPurchasesWithItem } from "src/utilities/purchasesRequests";

export function useSendPurchaseOrder(onSuccessFunc: (id: string) => void, onErrorFunc: (error: string) => void) {
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

export function useGetPurchaseHistory(page: number, limit: number, search: string): SearchReturn<PurchaseMini> {
  const privatePurchaseRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      PURCHASE_LIST_KEY,
      {
        page,
        limit,
        search
      },
    ],
    queryFn: () => {
      return privatePurchaseRequest.get<PaginationResults<PurchaseMini>>(PURCHASE_API, {
        params: {
          page,
          limit,
          payload: {search}
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

export function useGetIndividualPurchaseOrder(id: string, option?: Partial<UndefinedInitialDataOptions>) {
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
    error: error?.message ?? JSON.stringify(error),
    statusCode,
    data: axiosData
  };
}

export function useUpdatePurchase(id: string, onSuccessFunc: (id: string) => void, onErrorFunc: (error: string) => void) {
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

export function useDeletePurchase(id: string, onSuccessFunc: (id: string) => void, onErrorFunc: (error: string) => void) {
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

export function useGetPurchasesWithItem(page: number, limit: number, itemId: string, option?: Partial<UndefinedInitialDataOptions>) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      PURCHASE_LIST_KEY,
      {
        page,
        limit,
        itemId
      },
    ],
    queryFn: () => {
      return getPurchasesWithItem(privateInventoryRequest, itemId, page, limit);
    },
    ...option
  });
  
  return {
    isLoading,
    isError,
    error: JSON.stringify(error),
    results: data
  };
}