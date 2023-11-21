import { Response, Request } from "express";
const REFRESH_COOKIE = 'refreshJWT';

export function clearRefreshCookie(res: Response)
{
    res.clearCookie(REFRESH_COOKIE, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
}

export function addRefreshCookie(res: Response, refreshToken: string)
{
    res.cookie(REFRESH_COOKIE, refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
}

export function getRefreshToken(req: Request) : string | null {
    if (!req.cookies)
        return null;

    return req.cookies[REFRESH_COOKIE];
}