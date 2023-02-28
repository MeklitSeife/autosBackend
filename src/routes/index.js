import { Router } from "express";
import authRouter from "/Users/meklitseyfe/Desktop/finalproject/src/routes/authRoute.js";
import organizationRouter from "./organizationRoute";
import healthProfessionalRouter from "./healthProfessionalRoute";
import childRouter from "./childRoute";
import parentRouter from "./parentRoute";

const apiRouter = Router();

apiRouter.use("/api/v1/auth", authRouter);
apiRouter.use("/api/v1/organizationProfile", organizationRouter);
apiRouter.use("/api/v1/healthProfessionalProfile", healthProfessionalRouter);
apiRouter.use("/api/v1/parentProfile", parentRouter);
apiRouter.use("/api/v1/childProfile", childRouter);

export default apiRouter;