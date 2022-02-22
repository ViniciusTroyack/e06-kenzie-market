import { Request, Response, NextFunction, response } from 'express';

import ErrorClass from '../error/ErrorClass';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorClass) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}