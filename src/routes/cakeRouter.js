import { Router } from "express";
import { postCake, getCakes } from "../controllers/cakeController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import cakeSchema from "../schemas/cakeSchema.js";

const cakeRouter = Router();
cakeRouter.post("/cakes", validateSchemaMiddleware(cakeSchema), postCake);
cakeRouter.get("/cakes", getCakes);
export default cakeRouter;
