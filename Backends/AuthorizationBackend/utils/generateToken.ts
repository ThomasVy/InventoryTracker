import jwt from 'jsonwebtoken'
import process from "../data/dotenvDeclare";
import TokenPayload from '../data/TokenPayload';

const ACCESS_TOKEN_EXPIRES_IN = "5m";
const REFRESH_TOKEN_EXPIRES_IN = "1h";

export function generateAccessToken(data: TokenPayload, expiresIn: string)
{
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn });
}

export function generateRefreshToken(data: TokenPayload, expiresIn: string)
{
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn });   
}

export function generateDefaultTokens(id: string)
{
    const user = {id};
    return {
        newAccessToken : generateAccessToken(user, ACCESS_TOKEN_EXPIRES_IN),
        newRefreshToken : generateRefreshToken(user, REFRESH_TOKEN_EXPIRES_IN)
    };
}