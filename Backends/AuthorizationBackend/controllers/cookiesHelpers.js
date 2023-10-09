const REFRESH_COOKIE = 'refreshJWT';

function clearRefreshCookie(res)
{
    res.clearCookie(REFRESH_COOKIE, { httpOnly: true, sameSite: 'None', secure: true });
}

function addRefreshCookie(res, refreshToken)
{
    res.cookie(REFRESH_COOKIE, refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
}

module.exports = {clearRefreshCookie, addRefreshCookie};