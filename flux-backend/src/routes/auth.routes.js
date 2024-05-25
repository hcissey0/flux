import { Router } from "express";
import AuthController from "../controllers/auth.controller";


const authRouter = Router();

authRouter.get('/connect', AuthController.connectUser)

export default authRouter;
