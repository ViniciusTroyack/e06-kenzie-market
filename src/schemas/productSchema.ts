import * as yup from 'yup';

export const ProductSchema = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    price: yup.number(),
});