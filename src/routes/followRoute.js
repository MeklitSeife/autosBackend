import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import followController from "../controllers/followController"

const followRouter = Router();

followRouter.post("/",verifyToken,followController.followUser);
followRouter.post("/unfollow",verifyToken,followController.unfollowUser);
followRouter.get("/readAllFollowers",followController.readAllFollowers);
followRouter.get("/readAllFollowing",followController.readAllFollowing);
followRouter.post("/removeFollower",verifyToken,followController.removeFollower);

export default followRouter;