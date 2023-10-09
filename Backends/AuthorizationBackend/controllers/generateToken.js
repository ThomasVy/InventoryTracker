const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "1h";

function generateAccessToken(data, expiresIn)
{
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn });
}

function generateRefreshToken(data, expiresIn)
{
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn });   
}

function generateDefaultTokens(username)
{
    const user = {username};
    return {
        newAccessToken : generateAccessToken(user, ACCESS_TOKEN_EXPIRES_IN),
        newRefreshToken : generateRefreshToken(user, REFRESH_TOKEN_EXPIRES_IN)
    };
}
module.exports = {generateAccessToken, generateRefreshToken, generateDefaultTokens};