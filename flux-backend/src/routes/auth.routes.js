import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authentication/auth.middlwares";


const authRouter = Router();

authRouter.get('/connect', AuthController.connectUser)

authRouter.get('/me', authenticate, AuthController.getMe);

export default authRouter;
