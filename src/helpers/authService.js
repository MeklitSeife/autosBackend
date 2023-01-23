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
    const verifyLink = process.env.RootUrl + "/api/v1/auth/verifyEmail/"+client.id
    var transporter = nodemailer.createTransport({
      host: 'mail.ewenet.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'noreply@ewenet.net', // your domain email address
        pass: 'R{Mklpm~?oK]@aFxq*' // your password
      }
    });
    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extName: ".hbs",
          partialsDir: "./src/views",
          layoutsDir: "./src/views",
          defaultLayout: "",
        },
        viewPath: "./src/views/",
        extName: ".hbs",
      })
    );
  
    var mailOptions = {
      from: '"no reply" <noreply@ewenet.net>',
      to: client.email,
      subject: "Confirm your email address",
      template: "emailConfirmation",
      context: {
        UserName: client.f_name,
        ConfirmUrl: verifyLink,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return next(
          new GlobalError(
            "error occur when sending the email:: "+error,
            500
          )
        );
      } else { 
        return res.status(201).json({
          status: "success",
          message: "client successfully created",
          payload: _.omit(client.toJSON(), ["password"])
        });
      }
    });
    
  }
}catch(err) {
  return next(err)
}
});