const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { generateDefaultTokens } = require('./generateToken');
const { clearRefreshCookie } = require('./cookiesHelpers');
const { fillAuthResponse } = require('./responseHelpers');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshJWT) return res.sendStatus(201);
    const refreshToken = cookies.refreshJWT;
    clearRefreshCookie(res);

    const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse! Refresh token should never be reused.
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden
                // Delete refresh tokens of hacked user
                const hackedUser = await User.findOne({ username: decoded.username }).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        )
        return res.sendStatus(403); //Forbidden
    }

    //get rid of the current used refreshtoken. 
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                // expired refresh token
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
            }
            if (err || foundUser.username !== decoded.username) 
            {
                console.log("Refresh token was invalid or username didn't match");
                return res.sendStatus(403);
            }

            // Refresh token was still valid
            const { newAccessToken, newRefreshToken } = generateDefaultTokens(foundUser.username);

            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();

            fillAuthResponse(res, user.username, newAccessToken, newRefreshToken);
        }
    );
}

module.exports = handleRefreshToken;