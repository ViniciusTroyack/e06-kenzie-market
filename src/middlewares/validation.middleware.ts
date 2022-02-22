import { Request, Response, NextFunction } from 'express';
import ErrorClass from '../error/ErrorClass';

import * as yup from 'yup';

export const validate = (schema: yup.AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
        await schema.validate(body, { abortEarly: false, stripUnknown: true });
        next();
    } catch (e: any) {
        next(new ErrorClass({ [(e as any).name]: (e as any).errors }, 400));
    }
}