import User from "../model/User";
import { generateDefaultTokens } from '../utils/generateToken';
import { clearRefreshCookie, getRefreshToken } from '../utils/cookiesHelpers';
import { SendAuthResponse } from '../utils/responseHelpers';
import bcrypt from 'bcrypt';
import { Response, Request } from "express";
import LoginData from "../data/LoginData";


const handleLogin = async (req: Request<{}, {}, LoginData>, res: Response) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw new Error();
        }

        const foundUser = await User.findOne({ username }).exec();
        if (!foundUser) {
            throw new Error();
        }
        // evaluate password 
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) {
            throw new Error();
        }
        // create JWTs
        const { newAccessToken, newRefreshToken } = generateDefaultTokens(foundUser.id);

        const sentRefreshToken = getRefreshToken(req);

        let newRefreshTokenArray =
            !sentRefreshToken
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== sentRefreshToken);

        if (sentRefreshToken) {
            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const foundToken = await User.findOne({ refreshToken: sentRefreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            clearRefreshCookie(res);
        }

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        SendAuthResponse(res, username, newAccessToken, newRefreshToken);
    } catch (error) {
        return res.status(404).json({ 'message': 'Username and password do not match in our system.' });
    }

}

export default handleLogin;