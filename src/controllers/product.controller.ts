import { Request, Response, NextFunction } from "express";
import ErrorClass from "../error/ErrorClass";
import { createProduct, listAllProducts, getOneProduct } from "../services/product.service";

export const create = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = await createProduct(req.body);
        res.status(201).send(user);

    } catch (err) {
        next(err);
    }
}

export const list = async (req: Request, res: Response) => {
    
    const products = await listAllProducts();

    res.send(products);
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { uuid } = req.params;

        const getedProduct = await getOneProduct(uuid);
        res.send(getedProduct);

    } catch (err){
        next(new ErrorClass("Product not found", 404))
    }
    
}