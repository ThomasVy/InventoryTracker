import { addRefreshCookie } from "./cookiesHelpers";
import { Response } from "express";

export function fillAuthResponse(res : Response, username: string, accessToken : string, refreshToken: string) {
  addRefreshCookie(res, refreshToken);
  res.json({ username, accessToken });
}
