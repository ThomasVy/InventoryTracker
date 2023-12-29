import { z } from "zod";
export default function parseSearch(UnparsedSearch: string) {
    return z.string().default("").parse(UnparsedSearch);
}