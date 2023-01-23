import _ from "lodash";
import { signupService } from "../helpers/authService";
import { createTokens } from "../lib/generateToken";
import catchAsync from "../lib/catchAsync";
import { verify } from "../helpers/index";
import Model from "../models";
import { validationResult } from "express-validator";


const { clients } = Model;

export const signupController = catchAsync(async (req, res, next) => {
  await signupService(req, res, next);
});

export const emailVerificationController = catchAsync(async (req, res, next) => {
  try {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return ;
    }

  const client = await verify(clients,req.params.id);
  if(client){
  return res.status(200).json({
    status: "success",
    message: 'the client is verified!'
  });
}
}catch(err) {
  return next(err)
}
});

export const signinController = async (req, res) => {
  const refreshSecret = process.env.JWT_REFRESH_KEY + req.client.password; // 1
  const [token, refreshToken] = createTokens(
    //2
    {
      id: req.client.id,
      is_verified: req.client.is_verified,
      is_active: req.client.is_active
    },
    refreshSecret
  );
  const payload = { ...req.client, token, refreshToken };
  return res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    payload: _.omit(payload, ["password"])
  });
};
