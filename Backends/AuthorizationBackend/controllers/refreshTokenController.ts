import User from "../model/User";
import jwt from "jsonwebtoken";
import { generateDefaultTokens } from "../utils/generateToken";
import { clearRefreshCookie, getRefreshToken } from "../utils/cookiesHelpers";
import { SendAuthResponse } from "../utils/responseHelpers";
import process from "../data/dotenvDeclare";
import { Request, Response } from "express";
import TokenPayload from "../data/TokenPayload";

const handleRefreshToken = async (req: Request, res: Response) => {
  console.log("Refresh was called");
  const refreshToken = getRefreshToken(req);
  if (!refreshToken) return res.sendStatus(201);
  clearRefreshCookie(res);
  const foundUser = await User.findOne({ refreshToken });
  // Detected refresh token reuse! Refresh token should never be reused.
  try {
    if (!foundUser) {
      console.log(await User.find({username: "Thomas"}));
      console.log(
        `Could not find user in system with matching refresh token ${refreshToken}`
      );
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      ) as TokenPayload;
      // Delete refresh tokens of hacked user
      const hackedUser = await User.findById(decoded.id).exec();
      if (!hackedUser) {
        console.log("Could not find user?????");
        throw new Error();
      }
      console.log(
        `Shouldn't have but refresh token was reused..  We clearing refresh tokens for ${hackedUser.username}`
      );
      hackedUser.refreshToken = [];
      await hackedUser.save();
      throw Error();
    } else {
      console.log(`Refreshing for ${foundUser.username}`);
      //get rid of the current used refreshtoken.
      const newRefreshTokenArray = foundUser.refreshToken.filter(
        (rt) => rt !== refreshToken
      );

      // evaluate jwt
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      ) as TokenPayload;

      if (foundUser.id !== decoded.id) {
        console.log("Refresh token and id didn't match");
        throw new Error();
      }

      // Refresh token was still valid
      const { newAccessToken, newRefreshToken } = generateDefaultTokens(
        foundUser.id
      );

      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();
      console.log(foundUser.refreshToken, newRefreshToken);
      SendAuthResponse(
        res,
        foundUser.username,
        newAccessToken,
        newRefreshToken
      );
    }
  } catch (error) {
    if (foundUser) {
      console.log(
        `An error occured. Clearing refreshtoken for ${foundUser.username}`
      );
      foundUser.refreshToken = [];
      await foundUser.save();
    }
    return res.sendStatus(403); //Forbidden
  }
};

export default handleRefreshToken;
