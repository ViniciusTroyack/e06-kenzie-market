import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { ProductSchema } from "../schemas/productSchema";
import { isAuthenticated } from "../middlewares/authentication.middleware";
import { isAdm } from "../middlewares/adminAuthorization.middleware";
import { create, list, getProduct } from "../controllers/product.controller";

const router = Router();

export const pruductRouter = () => {
    
    router.post("", isAuthenticated, isAdm, validate(ProductSchema), create)
    router.get("", list)
    router.get("/:uuid", getProduct)

    return router;
}