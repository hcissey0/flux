import { Router } from "express";
import MessageController from "../controllers/message.controller";
import { validate } from "../middlewares/validation/validation.middlwares";
import { messageCreateSchema, messageUpdateSchema } from "../middlewares/validation/validation.schemas";

const messageRouter = Router();

messageRouter.post('/', validate(messageCreateSchema), MessageController.createMessage);

messageRouter.get('/', MessageController.getAllMessages);

messageRouter.get('/:messageId', MessageController.getMessage);

messageRouter.put('/:messageId', validate(messageUpdateSchema), MessageController.updateMessage);

messageRouter.delete('/:messageId', MessageController.deleteMessage);

export default messageRouter;
