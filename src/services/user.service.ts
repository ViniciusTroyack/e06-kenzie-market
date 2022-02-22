import { getRepository, getCustomRepository } from "typeorm";
import { User } from "../entities";
import ErrorClass from '../error/ErrorClass';
import UsersRepositories from '../repositories/userRepository';
// import { createCart } from "./cart.service";

interface UserBody {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
}


export const createUser = async (body: UserBody) => {
    const { name, email, password, isAdmin  } = body;
    try {
        console.log("criando")
        const userRepository = getRepository(User);
        
        const emailAlreadyExists = await userRepository.findOne({ email });

        if (emailAlreadyExists) {
            throw new ErrorClass("E-mail already registered", 400);
        }
        console.log("checkou email")
        const user = userRepository.create({
            email,
            password,
            name,
            isAdmin
        });
        
        
        const newUser = await userRepository.save(user);

        console.log(newUser)
        
        //createCart({user_id: user.id, finished: false })
        return user;
    } catch (e) {
        throw new ErrorClass((e as any).message, 400)
    }
}

export const listAll = async () => {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return users;
}

export const getOne = async (id: string | undefined) => {
    const userRepository = getRepository(User);

    const users = await userRepository.findOne(id);

    return users;
}

export const updateUser = async (id: string, data:{}) => {

    const userRepository = getRepository(User);

    userRepository.update(id, data);

    const users = await userRepository.findOne(id);

    return users;
}

export const deleteUser = async (id: string) => {

    const userRepository = getRepository(User);

    await userRepository.delete(id);

    return "User deleted";

}