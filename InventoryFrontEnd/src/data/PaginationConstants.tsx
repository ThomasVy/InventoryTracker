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