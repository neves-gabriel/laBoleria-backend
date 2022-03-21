import { Router } from "express";
import {
  postOrder,
  getOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import orderSchema from "../schemas/orderSchema.js";

const orderRouter = Router();
orderRouter.post("/order", validateSchemaMiddleware(orderSchema), postOrder);
orderRouter.get("/orders", getOrders);
orderRouter.get("/orders/:id", getOrderById);
export default orderRouter;
