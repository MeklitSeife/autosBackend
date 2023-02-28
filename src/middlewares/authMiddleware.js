import _ from "lodash";
import Model from "../models";
import GlobalError from "../lib/globalError";
import { findUser } from "../helpers/index";
import { comparePassword } from "../lib/passwordOp";
import { validationResult } from "express-validator";

const { User } = Model;

export const signinAuth = async (req, res, next) => {
  try{
  
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;

    }

    const { email, password } = req.body;

    const userAcc = await findUser(User, email);
  
    if (!userAcc) {
      return next(new GlobalError("user not found", 400));
    }
  
    if (!(await comparePassword(password, userAcc.password))) {
      return next(new GlobalError("Invalid credential", 400));
    }
  
    if (userAcc && !userAcc.toJSON().is_active) {
      return next(
        new GlobalError(
          "user isn't active, please contact the system administrator",
          401
        )
      );
    }
    if (userAcc && !userAcc.toJSON().is_verified) {
      return next(
        new GlobalError(
          "Your account isn't verified yet, please find the email we sent to you inorder to verify your account!",
          401
        )
      );
    }  
    console.log(userAcc.toJSON())
    req.user = userAcc.toJSON();
    next();
  }catch(err) {
    console.log(err.stack);
    
    next(
      new GlobalError(
        "something went wrong!",
        500
      )
    );
  }
};