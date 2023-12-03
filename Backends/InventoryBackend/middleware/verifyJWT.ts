import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import process from "../data/dotenvDeclare";
import TokenPayload from "../data/TokenPayload";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) throw new Error();

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as TokenPayload;
        req.userId = decoded.id;
        next()
    }
    catch (error) {
        res.status(401).send("Please authenicate");
    }
};

export default verifyJWT;
