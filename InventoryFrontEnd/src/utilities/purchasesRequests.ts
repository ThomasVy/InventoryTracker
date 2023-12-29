import { AxiosInstance } from "axios";
import { PaginationResults } from "src/data/PaginationConstants";
import { PURCHASE_API, PurchaseMini } from "src/data/PurchaseConstants";

export async function getPurchasesWithItem(privatePurchaseRequest: AxiosInstance, itemId: string, page: number, limit: number) {
    return privatePurchaseRequest.get<PaginationResults<PurchaseMini>>(
        PURCHASE_API, {
        params: {
          page,
          limit,
          payload: {itemId}
        }}).then((res) => res.data);
}