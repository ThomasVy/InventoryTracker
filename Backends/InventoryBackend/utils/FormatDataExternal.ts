import {z} from "zod";

export function FormatForExternal<T extends z.ZodRawShape> (zodSchema: z.ZodObject<T>) {
    return zodSchema.omit({userId: true});
}