import _ from "lodash";
import { signupService } from "../helpers/authService";
import { createTokens } from "../lib/generateToken";
import catchAsync from "../lib/catchAsync";
import Model from "../models";
import { validationResult } from "express-validator";


const { User } = Model;

export const signupController = catchAsync(async (req, res, next) => {
  console.log(req.body)
  await signupService(req, res, next);
});

export const emailVerificationController = catchAsync(async (req, res, next) => {
  console.log(req.body)
  try {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return ;
    }
 const userAcc = await User.findOne({
    where: {
    id: req.query.id
     },
     attributes: {
      exclude: ['password']
     },
   })
   if(userAcc){
      if(userAcc.otp == req.body.otp){
       const verifiedUser = await User.update(
          {
            is_verified: true 
           },
            {
          where: { id: req.query.id }
          }
       );
       if(verifiedUser){
        return res.status(200).json({
          status: "success",
          message: 'the user is verified!',
          userAcc
        }); 
       }
      }else{
        return res.status(401).json({
        status: "error",
        message: "error occured when verifying the user",
          });
         }
      }else{
          return res.status(401).json({
          status: "error",
          message: "incorrect verification code",
       });
      }
}catch(err) {
  return next(err)
}
});

export const signinController = async (req, res) => {
  const refreshSecret = process.env.JWT_REFRESH_KEY + req.user.password; 
  const [token, refreshToken] = createTokens(
    {
      id: req.user.id,
      is_active: req.user.is_active,
      user_type: req.user.user_type
    },
    refreshSecret
  );
  const payload = { ...req.user, token, refreshToken };
  return res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    payload: _.omit(payload, ["password","reset_pass_token_key","otp"])
  });
};
