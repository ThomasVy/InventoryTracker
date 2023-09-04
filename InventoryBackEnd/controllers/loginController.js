const User = require('../model/User');
const { generateRefreshToken, generateAccessToken } = require('./generateToken');
//const bcrypt = require('bcrypt');

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
    //const match = await bcrypt.compare(pwd, foundUser.password);
    const match = password === foundUser.password;
    if (!match) {
        return res.sendStatus(401);
    }
    // create JWTs
    
    const user = {username};
    const accessToken = generateAccessToken(user, "15m");
    const newRefreshToken = generateRefreshToken(user, "1h");

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

        res.clearCookie('refreshJWT', { httpOnly: true, sameSite: 'None', secure: true });
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie('refreshJWT', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    // Send authorization roles and access token to user
    res.json({ username, accessToken });
}

module.exports = handleLogin;