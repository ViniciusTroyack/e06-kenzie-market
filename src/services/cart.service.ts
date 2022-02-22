// import { getRepository } from "typeorm";
// import { Product } from "../entities";
// import Buys from "../entities/Buys"
// import ErrorClass from "../error/ErrorClass";

// interface ProductBody {
//     id: string
// }

// interface cartBody{
//     user_id: string;
//     finished: boolean;
// }


// export const addToCart = async (body: ProductBody) => {
//     const { id } = body;
//     try {
//         const buysRepository = getRepository(Buys);
//         const productRepository = getRepository(Product)
       
//         const product = await productRepository.findOne(id)

//         if(!product){
//             throw new ErrorClass("Product not found", 400)
//         }
        
//         await buysRepository.save(product)
        
//         return product;
//     } catch (e) {
//         throw new ErrorClass((e as any).message, 400)
//     }
// }

// export const createCart = async (body: cartBody) =>{
//     const {user_id, finished} = body
//     try{
//         const buysRepository = getRepository(Buys);

//         const cart = buysRepository.create({
//             user_id,
//             finished
//         })

//         await buysRepository.save(cart)

//         return cart;

//     }catch (e) {
//         throw new ErrorClass((e as any).message, 400)
//     }

// }