import { ZodError } from "zod";
import { StatusError } from "../types/error";
import { Response } from 'express';
import { MongoServerError } from "mongodb";

export function SendError(res: Response, error: unknown) {
    if (error instanceof ZodError) {
        const combinedErrorMessage = error.errors.reduce((accum, eachError) => {
            const allVariables = eachError.path.reduce((paths, name) => `${paths} ${name}`, "");
            return accum +`${allVariables} - ${eachError.message}\n`;
        }, "" );
        error = new StatusError(combinedErrorMessage, { statusCode: 403 });
    }
    else if (error instanceof MongoServerError) {
        if (error.code == 11000){
            error = new StatusError(`Duplicate Item`, {statusCode: 400})
        } else {
            error = new StatusError("Some mongo error. pls implement", {statusCode: 500})
        }
    }
    const statusError = error as StatusError;
    console.log(statusError.message);
    res.status(statusError.statusCode).json({message: statusError.message});
}