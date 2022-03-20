import { Router } from "express";
import { postOrder, getOrders } from "../controllers/orderController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import orderSchema from "../schemas/orderSchema.js";

const orderRouter = Router();
orderRouter.post("/order", validateSchemaMiddleware(orderSchema), postOrder);
orderRouter.get("/orders", getOrders);
export default orderRouter;
