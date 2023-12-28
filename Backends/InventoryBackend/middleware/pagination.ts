import { Pagination, PaginationResults, paginationSchema } from "../types/paginationTypes";
import { UserId } from "../types/user";

type FetchTotal = (userId: string, search: string) => Promise<number>;
type FetchItems<TItem> = (userId: string, search: string, itemLimit?: number, skip?: number) => Promise<TItem[]>

type PaginationParams<T> = {
    userId: UserId,
    paginationQuery: Pagination,
    getTotal: FetchTotal,
    getItems: FetchItems<T>
}

export async function pagination<T>({userId, paginationQuery, getTotal, getItems} : PaginationParams<T>) {
    const { page: queryPage, limit: queryLimit, search: querySearch } = paginationSchema.parse(paginationQuery);
    const totalNumberOfItems = await getTotal(userId, querySearch);
    let maxPage = Math.ceil(totalNumberOfItems / queryLimit) - 1;
    maxPage = maxPage >=0 ? maxPage : 0;
    const page = queryPage <= maxPage ? queryPage : maxPage;
    const skip = queryLimit > 0 ? queryLimit * page : undefined;
    const itemLimit = queryLimit > 0 ? queryLimit : undefined;
    const results = await getItems(userId, querySearch, itemLimit, skip);
    const limit = queryLimit !== -1 ? queryLimit : results.length;

    const startIndex = (page) * limit;
    const endIndex = (page + 1) * limit;

    let paginationResults: PaginationResults<T> = {
        page,
        limit,
        totalItems: totalNumberOfItems,
        results
    };

    if (endIndex < totalNumberOfItems) {
        paginationResults.nextPage = page + 1;
    }
    if (page !== maxPage) {
        paginationResults.maxPage = maxPage;
    }
    if (startIndex > 0) {
        paginationResults.previousPage = page - 1;
    }
    return paginationResults;
}