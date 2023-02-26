import { Router } from "express";
import { resetPasswordController } from "../controllers/resetPasswordController";

const authRouter = Router();
authRouter.post("/", resetPasswordController);

export default authRouter;