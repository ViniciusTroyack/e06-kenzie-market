import { Router } from "express";
import { addProduct, listAllCarts, getUserCartById, removeProduct } from "../controllers/cart.controller";
import { isAuthenticated } from "../middlewares/authentication.middleware";
import { isAdm } from "../middlewares/adminAuthorization.middleware";

const router = Router();

export const cartRouter = () => {
    
    router.post('', isAuthenticated, addProduct);
    router.get("", isAuthenticated, isAdm, listAllCarts)
    router.get("/:uuid", isAuthenticated, getUserCartById)
    router.delete("/:uuid", isAuthenticated, removeProduct)

    return router;
}