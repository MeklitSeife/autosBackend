import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import childController from "../controllers/childController";
import { validate } from "../middlewares/validators/parentValidate";

const childRouter = Router();
childRouter.post("/",verifyToken, validate('createChildProfile'),childController.createChildProfile);
childRouter.get("/readMyChildProfile",verifyToken,childController.readChildMyProfile);
childRouter.put("/updateChildProfile",verifyToken, validate('updateChildProfile'), childController.updateMyChildProfile);

export default childRouter;