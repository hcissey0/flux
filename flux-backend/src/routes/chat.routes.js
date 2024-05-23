import { Router } from "express";
import ChatController from "../controllers/chat.controller";

const chatRouter = Router();

chatRouter.post('/', ChatController.createChat);

chatRouter.get('/', ChatController.getAllChats);

chatRouter.get('/:chatId', ChatController.getChat);

chatRouter.put('/:chatId', ChatController.updateChat);

chatRouter.delete('/:chatId', ChatController.deleteChat);

export default chatRouter;
