const jwt = require('jsonwebtoken');

function generateAccessToken(user, expiresIn)
{
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn });
}

function generateRefreshToken(user, expiresIn)
{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn });   
}

module.exports = {generateAccessToken, generateRefreshToken};