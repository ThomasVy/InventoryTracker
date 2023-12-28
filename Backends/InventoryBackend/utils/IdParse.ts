import {z} from "zod";
const IdParser = z.coerce.number().positive();
export const uuidParser = z.string();
export default IdParser;