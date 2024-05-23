import { Router } from "express";
import UserController from "../controllers/user.controller";
import { validateCreateUser } from "../middlewares/validators/user.validators";
import { idValidator, validate } from "../middlewares/validators.middleware";

const userRouter = Router();

userRouter.post('/', validateCreateUser, UserController.createUser);

userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:userId', idValidator('userId'), validate, UserController.getUser);

userRouter.put('/:userId', UserController.updateUser);

userRouter.delete('/:userId', UserController.deleteUser);

export default userRouter;
