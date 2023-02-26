import Model from "../models";
import _ from "lodash";
import { findOrCreate } from "./index";
import { hashPassword } from "../lib/passwordOp";
import GlobalError from "../lib/globalError";
import catchAsync from "../lib/catchAsync";
import { validationResult } from "express-validator";

const axios = require("axios");
const { User } = Model;

export const signupService = catchAsync(async (req, res, next) => {

  try {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

  const password = await hashPassword(req.body.password);

  const email = req.body.email.toLowerCase();
  let otp = Math.floor(1000 + Math.random() * 900000).toString();
  const [userAcc, created] = await findOrCreate(User, {
    ...req.body,
    password,
    email,
    otp
  });

  if (!created) {
    return res.status(400).json({
      status: "fail",
      message: "user already exist"
    });
  }else if(created) {
    // send email logic 
      const options = {   method: 'POST',   url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
       headers: {
         'content-type': 'application/json',
         'X-RapidAPI-Key': 'ae5381ecc8msh0f57ec82fa1bea2p1bb060jsn95500a02d0b4',
         'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
       },
       data: `{"personalizations":[{"to":[{"email":"${userAcc.email}"}],"subject":"invitation code"}],"from":{"email":"jobtennis21@gmail.com"},"content":[{"type":"text/plain","value":"here is your invitation code:${otp}"}]}`,
      };
      axios.request(options).then(function (response) {
        return res.status(201).json({
          status: "success",
          message: "user account successfully created",
          payload: _.omit(userAcc.toJSON(), ["password","otp","reset_pass_token_key"])
        });
      }).catch(function (error) {
        return next(
          new GlobalError(
            "error occur when sending the email:: "+error,
            500
          )
        );
      });
   } 
}catch(err) {
  return next(err)
}
});