import { Router } from "express";
import { resendEmailController } from "../controllers/resendEmailController";

const authRouter = Router();
authRouter.post("/", resendEmailController);

export default authRouter;