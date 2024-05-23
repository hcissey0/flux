import { Router } from "express";
import PostController from "../controllers/post.controller";

const postRouter = Router();

postRouter.post('/', PostController.createPost);

postRouter.get('/', PostController.getAllPosts);

postRouter.get('/:postId', PostController.getPost);

postRouter.put('/:postId', PostController.updatePost);

postRouter.delete('/:postId', PostController.deletePost);

export default postRouter;
