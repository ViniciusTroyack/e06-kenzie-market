import { Request, Response } from "express";
import { authenticate } from "../services/login.service";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await authenticate(email, password);

    if(!token){
        return res.status(401).send({message: "Wrong email/password"})
    }

    res.send({ token });
}