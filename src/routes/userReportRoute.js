import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import userReportController from "../controllers/userReportController"
import { validate } from "../middlewares/validators/reportValidate";

const userReportRouter = Router();

userReportRouter.post("/",verifyToken, validate('createUserReport'),userReportController.createUserReport);
userReportRouter.get("/readOneReportDetail",userReportController.readOneReportDetail);
userReportRouter.get("/readAllReportsOfOneUser",userReportController.readAllReportsOfOneUser);
userReportRouter.get("/readAllReportedUsers",userReportController.readAllReportedUsers);

export default userReportRouter;