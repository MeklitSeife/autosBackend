import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import healthProfessionalProfileController from "../controllers/healthProfessionalProfileController"
import { validate } from "../middlewares/validators/healthProfessionalValidate";

const healthProfessionalRouter = Router();
healthProfessionalRouter.post("/", validate('createHealthProfessionalProfile'),healthProfessionalProfileController.createHealthProfessionalProfile);
healthProfessionalRouter.get("/readMyProfile",healthProfessionalProfileController.readHealthProfessionalProfile);
healthProfessionalRouter.post("/readHealthProfessionalProfile",validate('readHealthProfessionalProfile'),healthProfessionalProfileController.readHealthProfessionalProfileByOthers);
healthProfessionalRouter.put("/updateHealthProfessionalProfile", validate('updateHealthProfessionalProfile'), healthProfessionalProfileController.updateHealthProfessionalProfile);
healthProfessionalRouter.put("/updateHealthProfessionalLisence", validate('updateHealthProfessionalLisence'), healthProfessionalProfileController.updateHealthProfessionalLisence);
healthProfessionalRouter.put("/updateHealthProfessionalProfilePic", validate('updateHealthProfessionalProfilePic'), healthProfessionalProfileController.updateHealthProfessionalProfilePic);
healthProfessionalRouter.delete("/deleteHealthProfessionalProfile",healthProfessionalProfileController.removeHealthProfessionalProfile);


export default healthProfessionalRouter;