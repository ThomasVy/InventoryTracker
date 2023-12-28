export type PaginationResults<T> = {
    page : number,
    limit : number,
    totalItems: number,
    results: T[],
    nextPage?: number,
    maxPage?: number,
    previousPage?: number
};

export type PaginationControls = Omit<PaginationResults<void>, "results">;

export type SearchReturn<T> = {
    isLoading: boolean;
    isError: boolean;
    error: string;
    statusCode?: number;
    results?: PaginationResults<T>;
};
