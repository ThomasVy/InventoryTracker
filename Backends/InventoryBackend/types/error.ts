export class StatusError extends Error {
    statusCode: number;

    constructor(message: string, {statusCode}: {statusCode : number} ){
        super(message);
        this.statusCode = statusCode;
    }
}