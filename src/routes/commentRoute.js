import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import commentController from "../controllers/commentController";
import { validate } from "../middlewares/validators/commentValidate";

const commentRouter = Router();
commentRouter.post("/",verifyToken, validate('createComment'),commentController.createComment);
commentRouter.put("/updateComment",verifyToken, validate('updateComment'), commentController.updateComment);
commentRouter.get("/readMyOneComment",verifyToken,validate('readMyOneComment'), commentController.readMyOneComment);
commentRouter.get("/readAllCommentsOfOnePost",validate('readOnePostWithComment') ,commentController.readAllCommentsOfOnePost);
commentRouter.delete("/deleteMyComment", verifyToken,commentController.deleteMyComment);


export default commentRouter;