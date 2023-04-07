import { Router } from "express";
import childController from "../controllers/childController";
import { validate } from "../middlewares/validators/parentValidate";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";

const childRouter = Router();
childRouter.post("/", verifyToken ,validate('createChildProfile'),childController.createChildProfile);
childRouter.get("/readMyChildProfile",verifyToken,childController.readChildMyProfile);
childRouter.put("/updateChildProfile",verifyToken,validate('updateChildProfile'), childController.updateMyChildProfile);

export default childRouter;