import GlobalError from "../lib/globalError";
import { jwtVerifyToken, refreshToken } from "../lib/generateToken";
import catchAsync from "../lib/catchAsync";
import Model from "../models";

const { User ,Organization, Health_professional, Parent} = Model;

export const verifyToken = catchAsync(async (req, res, next) => {

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
    const userAcc = await User.findOne({
      where:{
        id:decoded.id
      },
      include:[{
        model: Organization ,
        as: 'organization', 
    },
    {
        model: Parent ,
        as: 'parent', 
    },
    {
      model: Health_professional ,
      as: 'health_professional', 
  }]
    });
    console.log(userAcc)
    if (!userAcc) {
      return next(new GlobalError("user does not exist!", 400));
        }
      req.user = userAcc.toJSON();
      next();
  } catch (err) {
    console.log(err.stack);
    const refresh_token = req.header('refreshToken');  
    const { accessToken, newRefreshToken } = await refreshToken(refresh_token, next); 
  }
});