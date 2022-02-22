import { Router } from "express";
import { login } from "../controllers/login.controller";

const router = Router();

export const loginRouter = () => {
    
    router.post('', login);

    return router;
}