import User from "../model/User";
import {Response, Request} from "express";
import { clearRefreshCookie } from "../utils/cookiesHelpers";
import { getRefreshToken } from "../utils/cookiesHelpers";

const handleLogout = async (req: Request, res: Response) => {
    // On client, also delete the accessToken

    const refreshToken = getRefreshToken(req);
    
    if (!refreshToken) 
    {
        console.log("no refresh token supplied");
        return res.sendStatus(204);
    }

    clearRefreshCookie(res);
    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        console.log("Could not find user");
        return res.sendStatus(200);
    }

    // Delete refreshToken in db
    console.log(`Removing refresh token from user ${foundUser.username}`);
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    await foundUser.save();
    res.sendStatus(200);
}
export default handleLogout;