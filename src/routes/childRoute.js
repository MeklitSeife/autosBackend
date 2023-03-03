import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import childController from "../controllers/childController";
import { validate } from "../middlewares/validators/parentValidate";

const childRouter = Router();
childRouter.post("/", validate('createChildProfile'),childController.createChildProfile);
childRouter.get("/readMyChildProfile",childController.readChildMyProfile);
childRouter.put("/updateChildProfile",validate('updateChildProfile'), childController.updateMyChildProfile);

export default childRouter;