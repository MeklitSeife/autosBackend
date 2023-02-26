import GlobalError from "../lib/globalError";
import { jwtVerifyToken, refreshToken } from "../lib/generateToken";
import catchAsync from "../lib/catchAsync";
import Model from "../models";
import { findByPk } from "../helpers/index";

const { User } = Model;

export const resetPassTokenMiddleware = catchAsync(async (req, res, next) => {

  const token = req.header('Authorization');
  if (!token) {
    return next(new GlobalError("You are not logged in", 401));
  }
  try {
    const decoded = await jwtVerifyToken(token);
    if (!decoded.is_active) {
      return next(
        new GlobalError(
          "user has been blocked, contact system administrator ",
          401
        )
      );
    }
    const userAcc = await findByPk(User, decoded.id);
    if (!userAcc) {
      return next(new GlobalError("user does not exist", 401));
    }
    if(!userAcc.reset_pass_token_key === decoded.resetTokenKey){
      return next(new GlobalError("error!", 401));
      }
    req.user = userAcc.toJSON();
    next();
  } catch (err) {
    console.log(err.stack);
    const refresh_token = req.header('refreshToken');  
    const { accessToken, newRefreshToken } = await refreshToken(refresh_token, next); 
  }
});
