import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from "typeorm"
import UserRepository from "../repositories/userRepository"
import 'dotenv/config'

export const authenticate = async (email: string, password: string) => {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ email });

    if (user === undefined || !bcrypt.compareSync(password, user.password)) {
        return undefined;
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET as string, { expiresIn: '1d' });

    return token;
}