import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import postReportController from "../controllers/postReportController"
import { validate } from "../middlewares/validators/reportValidate";

const postReportRouter = Router();

postReportRouter.post("/",verifyToken, validate('createPostReport'),postReportController.createPostReport);
postReportRouter.get("/readOneReportDetail",postReportController.readOneReportDetail);
postReportRouter.get("/readAllReportsOfOnePost",postReportController.readAllReportsOfOnePost);
postReportRouter.get("/readAllReportedPosts",postReportController.readAllReportedPosts);

export default postReportRouter;