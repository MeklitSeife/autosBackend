import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import healthProfessionalProfileController from "../controllers/healthProfessionalProfileController"
import { validate } from "../middlewares/validators/healthProfessionalValidate";

const healthProfessionalRouter = Router();
healthProfessionalRouter.post("/", verifyToken,validate('createHealthProfessionalProfile'),healthProfessionalProfileController.createHealthProfessionalProfile);
healthProfessionalRouter.get("/readMyProfile",verifyToken,healthProfessionalProfileController.readHealthProfessionalProfile);
healthProfessionalRouter.post("/readHealthProfessionalProfile",validate('readHealthProfessionalProfile'),healthProfessionalProfileController.readHealthProfessionalProfileByOthers);
healthProfessionalRouter.put("/updateHealthProfessionalProfile", validate('updateHealthProfessionalProfile'),verifyToken, healthProfessionalProfileController.updateHealthProfessionalProfile);
healthProfessionalRouter.put("/updateHealthProfessionalLisence", validate('updateHealthProfessionalLisence'), verifyToken,healthProfessionalProfileController.updateHealthProfessionalLisence);
healthProfessionalRouter.put("/updateHealthProfessionalProfilePic", validate('updateHealthProfessionalProfilePic'), verifyToken,healthProfessionalProfileController.updateHealthProfessionalProfilePic);
healthProfessionalRouter.delete("/deleteHealthProfessionalProfile",verifyToken,healthProfessionalProfileController.removeHealthProfessionalProfile);


export default healthProfessionalRouter;