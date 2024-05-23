import { Router } from "express";
import CommentController from "../controllers/comment.controller";

const commentRouter = Router();

commentRouter.post('/', CommentController.createComment);

commentRouter.get('/', CommentController.getAllComments);

commentRouter.get('/:commentId', CommentController.getComment);

commentRouter.put('/:commentId', CommentController.updateComment);

commentRouter.delete('/:commentId', CommentController.deleteComment);

export default commentRouter;
