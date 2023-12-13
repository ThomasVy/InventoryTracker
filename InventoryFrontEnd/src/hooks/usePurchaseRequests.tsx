import useAuthPrivateRequest from "./usePrivateRequest";
import backendRequest from "../api/backendRequest";
import { UndefinedInitialDataOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PURCHASE_API, PURCHASE_LIST_KEY, PurchaseItemDetails, PurchaseOrder } from "src/data/PurchaseConstants";

export function useSendPurchaseOrder(onSuccessFunc: (id: number) => void, onErrorFunc: (error: string) => void) {
  const privatePurchaseRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (purchaseOrder: PurchaseItemDetails[]) => {
      return privatePurchaseRequest.post(
        PURCHASE_API,
        JSON.stringify({ purchaseList: purchaseOrder })
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

export function useGetPurchaseHistory(page: number, limit: number) {
  const privatePurchaseRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      PURCHASE_LIST_KEY,
      {
        page,
        limit,
      },
    ],
    queryFn: () => {
      return privatePurchaseRequest.get(PURCHASE_API, {
        params: {
          page,
          limit
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
export function useGetIndividualPurchaseOrder(id: number, option?: Partial<UndefinedInitialDataOptions>) {
  const privateInventoryRequest = useAuthPrivateRequest(backendRequest);
  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: [PURCHASE_LIST_KEY, id],
    queryFn: () => {
      return privateInventoryRequest.get(`${PURCHASE_API}/${id}`);
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

export function useUpdatePurchase(id: number, onSuccessFunc: (id: number) => void, onErrorFunc: (error: string) => void) {
  const privatePurchaseRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (purchaseOrder: PurchaseOrder) => {
      const apiPurchaseOrder = {
        id: purchaseOrder.id,
        date: purchaseOrder.date.toDate(),
        items: purchaseOrder.items
      };
      return privatePurchaseRequest.put(
        `${PURCHASE_API}/${id}`,
        JSON.stringify({ purchaseOrder: apiPurchaseOrder })
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
    onError: (error: Error) => {
      onErrorFunc(JSON.stringify(error));
    },
  });

  return { mutate, isLoading: isPending };
}