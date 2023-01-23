import jwt from "jsonwebtoken";
import { promisify } from "util";
import _ from "lodash";
import { findByPk } from "../helpers";
import Model from "../models";
import GlobalError from "../lib/catchAsync";


export const createToken = (payload, secretKey, expiresIn) =>
  jwt.sign(payload, secretKey, {
    expiresIn,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER
  });

export const createTokens = (payload, refreshSecret) => {
  const token = createToken(
    payload,
    process.env.JWT_SECRET_KEY,
    `${process.env.JWT_ACCESS_TOKEN_EXPIRES}`
  );
  const refreshToken = createToken(
    payload,
    refreshSecret,
    `${process.env.JWT_REFRESH_TOKEN_EXPIRES}`
  );

  return [token, refreshToken];
};
export const createInfluencerTokens = (payload, refreshSecret) => {
  const token = createToken(
    payload,
    process.env.JWT_SECRET_KEY_INFLUENCER,
    `${process.env.JWT_ACCESS_TOKEN_EXPIRES}`
  );
  const refreshToken = createToken(
    payload,
    refreshSecret,
    `${process.env.JWT_REFRESH_TOKEN_EXPIRES}`
  );

  return [token, refreshToken];
};

export const verifyResetToken = (token) =>
  jwt.verify(token,process.env.JWT_RESET_KEY);

export const jwtVerifyToken = token =>
  jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
  
export const jwtVerifyTokenInfluencer = token =>
  jwt.verify(token, `${process.env.JWT_SECRET_KEY_INFLUENCER}`);

export const refreshToken = async (__rt, next) => {
  const decoded = jwt.decode(__rt);

  if (!decoded.id) {
    return next(new GlobalError("unAuthorize, please login", 401));
  }
  const freshClient = await findByPk(Clients, decoded.id);

  if (!freshClient) {
    return next(new GlobalError("client does not exist", 401));
  }

  const refreshSecret =
    process.env.JWT_REFRESH_KEY + freshClient.toJSON().password;

  try {
    await promisify(jwt.verify)(__rt, refreshSecret);
  } catch (err) {
    return next(
      new GlobalError("you are not logged in from refreshtoken", 401)
    );
  }

  const [token, refreshToken] = createTokens(
    _.pick(freshClient.toJSON(), ["id", "is_verified", "is_active"]),
    refreshSecret
  );

  if (token && refreshToken) {
    return {
      accessToken: token,
      newRefreshToken: refreshToken
    };
  }
};