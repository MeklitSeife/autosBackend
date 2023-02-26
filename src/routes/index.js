import { Router } from "express";
import authRouter from "/Users/meklitseyfe/Desktop/finalproject/src/routes/authRoute.js";

const apiRouter = Router();

apiRouter.use("/api/v1/auth", authRouter);


export default apiRouter;