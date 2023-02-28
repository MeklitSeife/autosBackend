import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import organizationProfileController from "../controllers/organizationProfileController";
import { validate } from "../middlewares/validators/organizationValidate";

const organizationRouter = Router();
organizationRouter.post("/",verifyToken, validate('createOrganizationProfile'),organizationProfileController.createOrganizationProfile);
organizationRouter.get("/readMyOrganizationProfile",verifyToken,organizationProfileController.readOrganizationProfile);
organizationRouter.post("/readOrganizationProfile",validate('readOrganizationProfile'),organizationProfileController.readOrganizationProfileByOthers);
organizationRouter.put("/updateOrganizationProfile",verifyToken, validate('updateOrganizationProfile'), organizationProfileController.updateOrganizationProfile);
organizationRouter.put("/updateOrganizationLisence",verifyToken, validate('updateOrganizationLisence'), organizationProfileController.updateOrganizationLisence);
organizationRouter.put("/updateOrganizationProfilePic",verifyToken, validate('updateOrganizationProfilePic'), organizationProfileController.updateOrganizationProfilePic);
organizationRouter.delete("/deleteOrganizationProfile", verifyToken,organizationProfileController.removeOrganizationProfile);


export default organizationRouter;