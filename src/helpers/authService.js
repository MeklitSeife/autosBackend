import Model from "../models";
import _ from "lodash";
import { findOrCreate } from "./index";
import { hashPassword } from "../lib/passwordOp";
import catchAsync from "../lib/catchAsync";
import nodemailer from "nodemailer";
import GlobalError from "../lib/globalError";
import hbs from "nodemailer-express-handlebars";
import { validationResult } from "express-validator";

const { clients } = Model;

export const signupService = catchAsync(async (req, res, next) => {

  try {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

  const password = await hashPassword(req.body.password);

  const email = req.body.email.toLowerCase();

  const [client, created] = await findOrCreate(clients, {
    ...req.body,
    password,
    email
  });

  if (!created) {
    return res.status(400).json({
      status: "fail",
      message: "user already exist"
    });
  }else if(created) {
    // send email logic
    
  }
}catch(err) {
  return next(err)
}
});