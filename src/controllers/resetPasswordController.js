import _ from "lodash";
import catchAsync from "../lib/catchAsync";
import GlobalError from "../lib/globalError";
import { update,findByPk } from "../helpers/index";
import { hashPassword,comparePassword } from "../lib/passwordOp";
import Model from "../models";
import { validationResult } from "express-validator";

const { User } = Model;

export const resetPasswordController = catchAsync(async (req, res, next) => {
  try {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const {currentPassword, newPassword} = req.body
    
const userAcc = await findByPk(User, req.user.id)
    if (!(await comparePassword(currentPassword, userAcc.password)))
      {
        return next(
          new GlobalError(
            "error! provide the correct inputs!",
           400
          )
        );
      }
   else{
    const id = req.user.id;
    const newHashedPass = await hashPassword(newPassword);
    const payload = {newHashedPass, id};
    const passChanged = await update(User,payload);
  
      if(passChanged){
        return res.status(201).json({
            status: "success",
            message: " user password is changed successfully",
          });
        }else{
          return next(
            new GlobalError(
              "error occured when reseting the password!",
             400
            )
          );
        }
      }
    }catch(err) {
      return next(
        new GlobalError(
          "error occured::" +err,
         500
        )
      );
    }
  });