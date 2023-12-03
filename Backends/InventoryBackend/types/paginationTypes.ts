import { Request } from "express";

export interface PaginationResults<T> {
    page : number,
    limit : number,
    totalItems: number,
    results: T[],
    nextPage?: number,
    maxPage?: number,
    previousPage?: number
}

interface PaginationQuery {
    limit: string,
    page: string
}

export interface PaginationRequest<T> extends Request<unknown, unknown, unknown, PaginationQuery>{
    paginationResults?: PaginationResults<T>;
}
  