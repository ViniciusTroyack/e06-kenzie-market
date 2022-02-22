import "reflect-metadata";
import express from 'express';
import { initRouter } from "./router";
import { connectDatabase } from "./database";
import { errorHandler } from './middlewares/error.middleware';

connectDatabase();

const app = express();

app.use(express.json());

initRouter(app);

app.use(errorHandler);

export default app;
