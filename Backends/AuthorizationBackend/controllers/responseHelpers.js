const { addRefreshCookie } = require('./cookiesHelpers');

function fillAuthResponse(res, username, accessToken, refreshToken)
{
    addRefreshCookie(res, refreshToken);
    res.json({ username, accessToken });
}

module.exports = {fillAuthResponse};