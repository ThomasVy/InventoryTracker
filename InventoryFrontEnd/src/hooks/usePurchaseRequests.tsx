import useAuthPrivateRequest from "./usePrivateRequest";
import backendRequest from "../api/backendRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PURCHASE_API, PURCHASE_LIST_KEY, PurchaseOrder } from "src/data/PurchaseConstants";

export function useSendPurchaseOrder(onSuccessFunc: (id: number) => void, onErrorFunc: (error: string) => void) {
  const privatePurchaseRequest = useAuthPrivateRequest(backendRequest);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (purchaseOrder: PurchaseOrder) => {
      return privatePurchaseRequest.post(
        PURCHASE_API,
        JSON.stringify(purchaseOrder)
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [PURCHASE_LIST_KEY],
      });
      if (data?.data) {
        const {purchaseId} = data?.data;
        onSuccessFunc(purchaseId);
      } else{
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