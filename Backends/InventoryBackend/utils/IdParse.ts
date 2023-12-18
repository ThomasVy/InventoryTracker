import {z} from "zod";

const IdParser = z.coerce.number().positive();

export default IdParser;