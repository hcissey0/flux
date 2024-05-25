import { Router } from "express";
import CommentController from "../controllers/comment.controller";
import { validate } from "../middlewares/validation/validation.middlwares";
import { commentCreateSchema, commentUpdateSchema } from "../middlewares/validation/validation.schemas";

const commentRouter = Router();

commentRouter.post('/', validate(commentCreateSchema), CommentController.createComment);

commentRouter.get('/', CommentController.getAllComments);

commentRouter.get('/:commentId', CommentController.getComment);

commentRouter.put('/:commentId', validate(commentUpdateSchema), CommentController.updateComment);

commentRouter.delete('/:commentId', CommentController.deleteComment);

export default commentRouter;
