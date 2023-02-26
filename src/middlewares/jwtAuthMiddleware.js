import GlobalError from "../lib/globalError";
import { jwtVerifyTokenInfluencer, refreshToken } from "../lib/generateToken";
import catchAsync from "../lib/catchAsync";
import Model from "../models";

const { Influencer ,Influencer_profile} = Model;

export const verifyToken = catchAsync(async (req, res, next) => {

  const token = req.header('Authorization');
  if (!token) {
    return next(new GlobalError("You are not logged in", 401));
  }
  try {
    const decoded = await jwtVerifyTokenInfluencer(token);
    if (!decoded.is_active) {
      return next(
        new GlobalError(
          "influencer has been blocked, contact system administrator ",
          401
        )
      );
    }
    const influencer = await Influencer.findOne({
      where:{
        id:decoded.id
      },
      include: {
        model: Influencer_profile,
        as: 'profile'
      },
    });
    if (!influencer) {
      return next(new GlobalError("influencer does not exist!", 400));
        }
      req.influencer = influencer.toJSON();
      next();
  } catch (err) {
    console.log(err.stack);
    const refresh_token = req.header('refreshToken');  
    const { accessToken, newRefreshToken } = await refreshToken(refresh_token, next); 
  }
});