import { getRepository } from "typeorm";
import { Product, User } from "../entities";
import Buys from "../entities/Buys"
import ErrorClass from "../error/ErrorClass";

interface addToCartBody {
    product_id: string
    user_id: string
}

interface deleteFromCartBody {
    product_id: string
    user_id: string
    cart_id: string
}

interface cartBody {
    user_id: string;
    finished: boolean;
}

interface getCartBody {
    user_id: string
    cart_id: string
}

export const createCart = async (body: cartBody) => {
    const { user_id, finished } = body
    try {
        const buysRepository = getRepository(Buys);

        const cart = buysRepository.create({
            user_id,
            finished
        })

        await buysRepository.save(cart)

        return cart;

    } catch (e) {
        throw new ErrorClass((e as any).message, 400)
    }
}

export const getCartById = async (cart_id: string, user_id: string) => {
    try {
        const cartRepository = getRepository(Buys)
        const userRepository = getRepository(User)

        const user = await userRepository.findOne(user_id)

        if(!user){
            throw new ErrorClass('User not found', 404)
        }

        const cart = await cartRepository.findOne(cart_id)
        
        if(!cart || cart.finished){
            throw new ErrorClass('Cart not found', 404)
        }

        return cart
    } catch (e) {
        throw new ErrorClass((e as any).message, 400)
    }
}


export const getAllCarts = async () => {
    try {
        const cartRepository = getRepository(Buys)

        const cart = await cartRepository.find({
            where: {
                finished: false
            }
        })

        return cart
    } catch (e) {
        throw new ErrorClass((e as any).message, 400)
    }
}


export const addToCart = async (product_id: string, user_id: string) => {
    //const { product_id, user_id } = body;
    try {
        const cartRepository = getRepository(Buys);
        const productRepository = getRepository(Product)

        const cart = await cartRepository.find({
            where: {
                user_id,
                finished: false
            },
            relations: [
                'product'
            ]
        })

        const product = await productRepository.findOne(product_id)

        if (!product) {
            throw new ErrorClass("Product not found", 400)
        }

        cart[0].product.push(product)

        await cartRepository.save(cart)

        return cart;
    } catch (e) {
        throw new ErrorClass((e as any).message, 400)
    }
}

export const deleteOfCart = async (user_id: string, product_id: string) => {
    try {
        const buysRepository = getRepository(Buys);
        const productRepository = getRepository(Product)
        const userRepository = getRepository(User)

        const user = await userRepository.findOne(user_id)

        const cart = await buysRepository.findOne(user_id)
        
        if (!cart || cart.finished) {
            throw new ErrorClass('Cart not found', 404)
        }

        const product = await productRepository.findOne(product_id)

        if (!product) {
            throw new ErrorClass('Product not found', 404)
        }
    
        if (!user?.isAdmin && cart.user_id != user?.id) {
            throw new ErrorClass('Missing admin permissions', 401)
        }

        const indexOfProduct = cart.product.indexOf(product)
        cart.product.splice(indexOfProduct)
        buysRepository.save(cart)

        return

    } catch (e) {
        throw new ErrorClass((e as any).message, 400)
    }

}