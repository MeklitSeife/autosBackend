import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import parentProfileController from "../controllers/parentProfileController";
import { validate } from "../middlewares/validators/parentValidate";
import { verify } from "../helpers";

const parentProfileRouter = Router();
parentProfileRouter.post("/",verifyToken,validate('createParentProfile'),parentProfileController.createParentProfile);
parentProfileRouter.get("/readMyParentProfile",verifyToken,parentProfileController.readParentProfile);
parentProfileRouter.post("/readParentProfile",validate('readParentProfile'),parentProfileController.readParentProfileByOthers);
parentProfileRouter.put("/updateParentProfile",verifyToken, validate('updateParentProfile'), parentProfileController.updateParentProfile);
parentProfileRouter.put("/updateParentProfilePic",verifyToken, validate('updateParentProfilePic'), parentProfileController.updateParentProfilePic);
parentProfileRouter.delete("/deleteParentProfile", verifyToken,parentProfileController.removeParentProfile);

export default parentProfileRouter;