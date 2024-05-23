import { Router } from "express";
import MessageController from "../controllers/message.controller";

const messageRouter = Router();

messageRouter.post('/', MessageController.createMessage);

messageRouter.get('/', MessageController.getAllMessages);

messageRouter.get('/:messageId', MessageController.getMessage);

messageRouter.put('/:messageId', MessageController.updateMessage);

messageRouter.delete('/:messageId', MessageController.deleteMessage);

export default messageRouter;
