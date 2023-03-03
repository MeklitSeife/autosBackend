import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAuthMiddleware";
import postController from "../controllers/postController"
import { validate } from "../middlewares/validators/PostValidate";

const postRouter = Router();
postRouter.post("/",verifyToken, validate('createPost'),postController.createPost);
postRouter.post("/readAllMyPosts",verifyToken,postController.readAllMyPosts);
postRouter.post("/readMyOnePost",validate('readMyOnePost'),postController.readMyOnePost);
postRouter.put("/updatePost",verifyToken, validate('updatePost'), postController.updatePost);
postRouter.get("/readAllPosts", postController.readAllPosts);
postRouter.post("/like", postController.likePost);
postRouter.post("/unlike", postController.unlikePost);
postRouter.post("/readAllPostsOfOneUser", validate('readAllPostsOfOneUser'), postController.readAllPostsOfOneUser);
postRouter.post("/readOnePostOfUser", validate('readOnePostOfUser'), postController.readOnePostOfUser);
postRouter.delete("/removeOnepost", verifyToken,postController.removeOnepost);


export default postRouter;