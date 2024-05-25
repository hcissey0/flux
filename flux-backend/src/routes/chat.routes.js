import { Router } from "express";
import ChatController from "../controllers/chat.controller";
import { validate } from "../middlewares/validation/validation.middlwares";
import { chatCreateSchema, chatUpdateSchema } from "../middlewares/validation/validation.schemas";

const chatRouter = Router();

chatRouter.post('/', validate(chatCreateSchema), ChatController.createChat);

chatRouter.get('/', ChatController.getAllChats);

chatRouter.get('/:chatId', ChatController.getChat);

chatRouter.put('/:chatId', validate(chatUpdateSchema), ChatController.updateChat);

chatRouter.delete('/:chatId', ChatController.deleteChat);

export default chatRouter;
