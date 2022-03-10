import { Express } from "express";
import { loginRouter } from "./login.router";
import { userRouter } from "./user.router";
import { pruductRouter } from "./product.router";
import { cartRouter } from "./cart.router";

export const initRouter = (app: Express) => {
    app.use("/login", loginRouter())
    app.use("/user", userRouter())
    app.use("/product", pruductRouter())
    app.use("/cart", cartRouter())
}