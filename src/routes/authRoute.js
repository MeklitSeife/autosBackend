import { Router } from "express";
import {
    signupController,
    signinController,
    emailVerificationController, 
  } from "../controllers/authController";
import { signinAuth } from "../middlewares/authMiddleware";
import { resendEmailController } from "../controllers/resendEmailController";
import { validate } from "../middlewares/validators/validate";
import { resetPassTokenMiddleware } from "../middlewares/resetPassTokenMiddleware";
import { resetPasswordController } from "../controllers/resetPasswordController";


const authRouter = Router();

authRouter.post("/signup",validate('signup'), signupController);
authRouter.post("/signin", signinAuth,validate('signin'), signinController);
authRouter.post("/verifyEmail",validate('verifyUser'), emailVerificationController);
authRouter.post("/resendEmail", validate('resendEmailVerification'),resendEmailController);
authRouter.post("/resetPassword",resetPassTokenMiddleware,validate('resetPassword'),  resetPasswordController);


export default authRouter;