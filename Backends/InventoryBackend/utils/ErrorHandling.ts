import { ZodError } from "zod";
import { StatusError } from "../types/error";
import { Response } from 'express';

export function SendError(res: Response, error: unknown) {
    if (error instanceof ZodError) {
        const combinedErrorMessage = error.errors.reduce((total, eachError) => total +`${eachError.message}\n`, "");
        error = new StatusError(combinedErrorMessage, { statusCode: 403 });
    }
    const statusError = error as StatusError;
    console.log(statusError.message);
    res.status(statusError.statusCode).json({message: statusError.message});
}