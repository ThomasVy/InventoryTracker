import { StatusError } from "../types/error";
import { Response } from 'express';

export function SendError(res: Response, error: unknown) {
    const statusError = error as StatusError;
    console.log(statusError.message);
    res.status(statusError.statusCode).json({message: statusError.message});
}