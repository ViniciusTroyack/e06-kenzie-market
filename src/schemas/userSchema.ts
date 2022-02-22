import * as yup from 'yup';

export const UserSchema = yup.object().shape({
    email: yup.string().email(),
    name: yup.string(),
    password: yup.string().min(6),
    isAdmin: yup.bool(),
});