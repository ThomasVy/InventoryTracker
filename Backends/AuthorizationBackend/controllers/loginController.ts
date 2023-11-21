import User from "../model/User";
import { generateDefaultTokens } from '../utils/generateToken';
import { clearRefreshCookie, getRefreshToken } from '../utils/cookiesHelpers';
import { fillAuthResponse } from '../utils/responseHelpers';
import bcrypt from 'bcrypt';
import { Response, Request } from "express";
import Login from "../data/Login";


const handleLogin = async (req : Request<{}, {}, Login>, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(401).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) 
    {
        return res.sendStatus(401);
    }
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        return res.sendStatus(401);
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

    fillAuthResponse(res, username, newAccessToken, newRefreshToken);
}

export default handleLogin;