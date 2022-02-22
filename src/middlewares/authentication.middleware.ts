import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import ErrorClass from '../error/ErrorClass';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    jwt.verify(token as string, process.env.SECRET as string, (err: any, decoded: any) => {
        if (err) {
            return next(new ErrorClass("Missing authorization headers", 401));
        }
        
        const userID = decoded.id;

        req.user = {id: userID}

        return next();
    });
}