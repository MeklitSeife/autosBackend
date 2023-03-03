import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import organizationProfileController from "../controllers/organizationProfileController";
import { validate } from "../middlewares/validators/organizationValidate";

const organizationRouter = Router();
organizationRouter.post("/", validate('createOrganizationProfile'),organizationProfileController.createOrganizationProfile);
organizationRouter.get("/readMyOrganizationProfile",organizationProfileController.readOrganizationProfile);
organizationRouter.post("/readOrganizationProfile",validate('readOrganizationProfile'),organizationProfileController.readOrganizationProfileByOthers);
organizationRouter.put("/updateOrganizationProfile", validate('updateOrganizationProfile'), organizationProfileController.updateOrganizationProfile);
organizationRouter.put("/updateOrganizationLisence", validate('updateOrganizationLisence'), organizationProfileController.updateOrganizationLisence);
organizationRouter.put("/updateOrganizationProfilePic", validate('updateOrganizationProfilePic'), organizationProfileController.updateOrganizationProfilePic);
organizationRouter.delete("/deleteOrganizationProfile",organizationProfileController.removeOrganizationProfile);


export default organizationRouter;