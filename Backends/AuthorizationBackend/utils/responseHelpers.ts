import { addRefreshCookie } from "./cookiesHelpers";
import { Response } from "express";

export function SendAuthResponse(res : Response, username: string, accessToken : string, refreshToken: string) {
  addRefreshCookie(res, refreshToken);
  res.json({ username, accessToken });
}
