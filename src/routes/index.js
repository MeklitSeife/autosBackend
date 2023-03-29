import { Router } from "express";
import authRouter from "/Users/meklitseyfe/Desktop/autos/finalproject/src/routes/authRoute.js";
import organizationRouter from "./organizationRoute";
import healthProfessionalRouter from "./healthProfessionalRoute";
import childRouter from "./childRoute";
import parentRouter from "./parentRoute";
import postRouter from "./postRoute";
import moderatorRouter from "./moderatorRoute";
import commentRouter from "./commentRoute";

const apiRouter = Router();

apiRouter.use("/api/v1/auth", authRouter);
apiRouter.use("/api/v1/organizationProfile", organizationRouter);
apiRouter.use("/api/v1/healthProfessionalProfile", healthProfessionalRouter);
apiRouter.use("/api/v1/parentProfile", parentRouter);
apiRouter.use("/api/v1/childProfile", childRouter);
apiRouter.use("/api/v1/post", postRouter);
apiRouter.use("/api/v1/comment", commentRouter);
apiRouter.use("/api/v1/moderator", moderatorRouter);

export default apiRouter;