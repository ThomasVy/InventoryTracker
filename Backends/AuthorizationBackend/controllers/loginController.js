const User = require('../model/User');
const { generateDefaultTokens } = require('./generateToken');
const { clearRefreshCookie } = require('./cookiesHelpers');
const { fillAuthResponse } = require('./responseHelpers');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const cookies = req.cookies;

    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

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

    // Changed to let keyword
    let newRefreshTokenArray =
        !cookies?.jwt
            ? foundUser.refreshToken
            : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

    if (cookies?.refreshJWT) {

        /* 
        Scenario added here: 
            1) User logs in but never uses RT and does not logout 
            2) RT is stolen
            3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */
        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({ refreshToken }).exec();

        // Detected refresh token reuse!
        if (!foundToken) {
            // clear out ALL previous refresh tokens
            newRefreshTokenArray = [];
        }

        clearRefreshCookie(res);
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    fillAuthResponse(res, username, newAccessToken, newRefreshToken);
}

module.exports = handleLogin;