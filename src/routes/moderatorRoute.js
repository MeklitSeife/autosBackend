import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import moderatorController from "../controllers/moderatorController";
//import { validate } from "../middlewares/validators/parentValidate";

const moderatorRouter = Router();
moderatorRouter.post("/",moderatorController.createModeratorProfile);
moderatorRouter.get("/readMyModeratorProfile",verifyToken,moderatorController.readModeratorProfile);
moderatorRouter.post("/readModeratorProfile",moderatorController.readModeratorProfileByAdmin);
moderatorRouter.put("/updateModeratorProfile",verifyToken,  moderatorController.updateModeratorProfile);
moderatorRouter.delete("/deleteModeratorProfile", verifyToken,moderatorController.removeModeratorProfile);
moderatorRouter.get("/readAllModeratorProfileByAdmin", verifyToken,moderatorController.readAllModeratorProfileByAdmin);

export default moderatorRouter;