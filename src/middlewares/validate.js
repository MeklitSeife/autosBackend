import { body,param,query,oneOf} from "express-validator"
import { findUserByEmail } from "../helpers/index";
import Model from "../models";
exports.validate = (method) => {
    
  const { User } = Model;
  switch (method) {
    case 'signup': {
        return [ 
           body('email').notEmpty().withMessage('Email Address required')
           .normalizeEmail().isEmail().withMessage('must be a valid email')
           .custom(value => {
             return findUserByEmail(User, value).then(userAcc=> {
               if (userAcc) {
                 return Promise.reject('email already in use');
               }
             });
           }),
           body('password').trim().notEmpty().withMessage('Password required') 
           .isLength({ min: 6 }).withMessage('password must be minimum 6 length')
           .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
           .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
           .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
           .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
           .not().matches(/^$|\s+/).withMessage('White space not allowed'),
           body('user_type').notEmpty().withMessage('user type is required')
           ] 
        }
    case 'signin': {
      return [
          body('email').notEmpty().withMessage('email is required'),
          body('password').notEmpty().withMessage('password is required'),
      ] 
    }
    case 'verifyUser': {
        return [
            query('id').notEmpty().withMessage('user id is required'),
            body('otp').notEmpty().withMessage('verification code is required'),
        ] 
    }
    case 'resendEmailVerification': {
        return [
            query('email').notEmpty().withMessage('email is required'),
        ] 
    }
    case 'resetPassword':{
      return[
        body('currentPassword').notEmpty().withMessage('current password is required'),
        body('newPassword').trim().notEmpty().withMessage('new password required') 
        .isLength({ min: 6 }).withMessage('password must be minimum 6 length')
        .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
        .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
        .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
        .matches(/(?=.*?[#?!@$%^&*-_])/).withMessage('At least one special character')
        .not().matches(/^$|\s+/).withMessage('White space not allowed'),  
      ]
   }
    
  }
}