import { Router } from "express";
import UserController from "../controllers/user.controller";
import { validate } from "../middlewares/validation/validation.middlwares";
import { userCreateSchema, userUpdateSchema } from "../middlewares/validation/validation.schemas";
import { authenticate } from "../middlewares/authentication/auth.middlwares";

const userRouter = Router();


// create a user
userRouter.post('/', validate(userCreateSchema), UserController.createUser);

// get the current user
userRouter.get('/me', authenticate, UserController.getMe);

// get all users
userRouter.get('/',/* authenticate,*/ UserController.getAllUsers);

// get a single user
userRouter.get('/:userId', authenticate, UserController.getUser);

//
userRouter.put('/:userId', authenticate, validate(userUpdateSchema), UserController.updateUser);

userRouter.delete('/:userId', authenticate, UserController.deleteUser);

userRouter.post('/:userId/follow', authenticate, UserController.followUser);


export default userRouter;
