import { Request, Response, NextFunction } from "express";
import ErrorClass from "../error/ErrorClass";
import { addToCart, getAllCarts, getCartById, deleteOfCart } from "../services/cart.service";
import { getOne } from "../services/user.service";

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUser = req.user
        const productId = req.body

        if(!currentUser) {
            return next(new ErrorClass('Missing user id', 404))
        } 

        const cart = await addToCart(productId, currentUser?.id) 

        res.send(cart)

    } catch (error) {
        next(new ErrorClass("Product not found", 404))
    }

}

export const listAllCarts = async (req: Request, res: Response, next: NextFunction) => {
    
    const allCarts = await getAllCarts()
    res.send(allCarts)
}

export const getUserCartById = async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.user
    const { uuid } = req.params;
    const profile = await getOne(currentUser?.id);

    if(!profile){
        return next(new ErrorClass('User not found', 404))
    }

    try{
        const getedCart = await getCartById(uuid, profile?.id)

        if(profile.isAdmin != true && getedCart.user_id != profile.id){
            return next(new ErrorClass('Missing admin permissions', 401));
        }
        res.send(getedCart);
    } catch(err){
        next(new ErrorClass("Cart not found", 404))
    }
}

export const removeProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUser = req.user
        const { uuid } = req.params;
        const profile = await getOne(currentUser?.id);

        if(!profile){
            return next(new ErrorClass('User not found', 404))
        }

        // const getedCart = await getCartById(uuid, profile?.id)

        // if(profile.isAdmin != true && getedCart.user_id != profile.id){
        //     return next(new ErrorClass('Missing admin permissions', 401));
        // }
        // console.log("000000000000000000000000")
        deleteOfCart(profile.id, uuid)
        // console.log("77777777777777777777777777")
        res.send({message: "Product removed"})

    } catch (error) {
        next(new ErrorClass("Internal Erro", 500))
    }
    
    
}
