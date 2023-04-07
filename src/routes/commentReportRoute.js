import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import commentReportController from "../controllers/commentReportController"
import { validate } from "../middlewares/validators/reportValidate";

const commentReportRouter = Router();

commentReportRouter.post("/",verifyToken, validate('createCommentReport'),commentReportController.createCommentReport);
commentReportRouter.get("/readOneReportDetail",commentReportController.readOneReportDetail);
commentReportRouter.get("/readAllReportsOfOneComment",commentReportController.readAllReportsOfOneComment);
commentReportRouter.get("/readAllReportedComments",commentReportController.readAllReportedComments);

export default commentReportRouter;