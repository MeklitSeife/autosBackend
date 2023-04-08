import { Router } from "express";
import authRouter from "/Users/meklitseyfe/Desktop/autos/finalproject/src/routes/authRoute.js";
import organizationRouter from "./organizationRoute";
import healthProfessionalRouter from "./healthProfessionalRoute";
import childRouter from "./childRoute";
import parentRouter from "./parentRoute";
import postRouter from "./postRoute";
import moderatorRouter from "./moderatorRoute";
import commentRouter from "./commentRoute";
import userReportRouter from "./userReportRoute";
import postReportRouter from "./postReportRoute";
import commentReportRouter from "./commentReportRoute";
import followRouter from "./followRoute";

const apiRouter = Router();

apiRouter.use("/api/v1/auth", authRouter);
apiRouter.use("/api/v1/organizationProfile", organizationRouter);
apiRouter.use("/api/v1/healthProfessionalProfile", healthProfessionalRouter);
apiRouter.use("/api/v1/parentProfile", parentRouter);
apiRouter.use("/api/v1/childProfile", childRouter);
apiRouter.use("/api/v1/post", postRouter);
apiRouter.use("/api/v1/comment", commentRouter);
apiRouter.use("/api/v1/moderator", moderatorRouter);
apiRouter.use("/api/v1/userReport", userReportRouter);
apiRouter.use("/api/v1/postReport", postReportRouter);
apiRouter.use("/api/v1/commentReport", commentReportRouter);
apiRouter.use("/api/v1/follow", followRouter);

export default apiRouter;