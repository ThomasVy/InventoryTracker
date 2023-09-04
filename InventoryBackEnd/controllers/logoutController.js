const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.refreshJWT) 
    {
        console.log("no refresh token supplied");
        return res.sendStatus(204);
    }
    const refreshToken = cookies.refreshJWT;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        console.log("Could not find user");
        res.clearCookie('refreshJWT', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(200);
    }

    // Delete refreshToken in db
    console.log(`Removing refresh token from user ${foundUser.username}`);
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
    const result = await foundUser.save();
    res.clearCookie('refreshJWT', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(200);
}

module.exports = handleLogout