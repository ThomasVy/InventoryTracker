import { Request } from "express";
import {z} from "zod";

export interface PaginationResults<T> {
    page : number,
    limit : number,
    totalItems: number,
    results: T[],
    nextPage?: number,
    maxPage?: number,
    previousPage?: number
}

const DEFAULT_LIMIT = 5;
const DEFAULT_PAGE = 0;

export const paginationSchema = z.object({
    page: z.coerce.number().min(0).max(50).default(DEFAULT_PAGE),
    limit: z.coerce.number().max(50).default(DEFAULT_LIMIT)
});

export type Pagination= z.infer<typeof paginationSchema>

type RequestParams<T> = Pagination & {
    payload: T
};

export interface PaginationRequest<TPaginationResults, TPayload> extends Request<unknown, unknown, unknown, RequestParams<TPayload>>{
    paginationResults?: PaginationResults<TPaginationResults>;
}

export type SearchPayload = {
    search: string
};
 