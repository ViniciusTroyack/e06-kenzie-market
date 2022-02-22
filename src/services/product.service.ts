import { getRepository} from "typeorm";
import { Product } from "../entities";
import ErrorClass from '../error/ErrorClass';

interface ProductBody {
    name: string,
    description: string,
    price: number
}


export const createProduct = async (body: ProductBody) => {
    const { name, description, price  } = body;
    try {

        const productRepository = getRepository(Product);
        
        const productAlreadyExists = await productRepository.findOne({ name });

        if (productAlreadyExists) {
            throw new ErrorClass("Product already registered", 400);
        }

        const product = productRepository.create({
            name,
            description,
            price
        });
        
        await productRepository.save(product);
        
        return product;
    } catch (e) {
        throw new ErrorClass((e as any).message, 400)
    }
}

export const listAllProducts = async () => {
    const productRepository = getRepository(Product);

    const products = await productRepository.find();

    return products;
}

export const getOneProduct = async (id: string | undefined) => {
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(id);
  
    return product;
}