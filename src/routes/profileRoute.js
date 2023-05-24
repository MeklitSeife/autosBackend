import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import profileController from "../controllers/profileController";
import parentProfileController from "../controllers/parentProfileController"
import { validate } from "../middlewares/validators/parentValidate";


const profileRouter = Router();
profileRouter.get("/readUserProfile",profileController.readUserProfile);
profileRouter.get("/removeUserProfile",verifyToken,profileController.removeUserProfile);
profileRouter.get("/updateParentProfile", validate('updateParentProfile'),verifyToken,parentProfileController.updateParentProfile);

export default profileRouter;