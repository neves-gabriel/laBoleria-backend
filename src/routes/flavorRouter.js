import { Router } from "express";
import { postFlavor, getFlavors } from "../controllers/flavorController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import flavorSchema from "../schemas/flavorSchema.js";

const flavorRouter = Router();
flavorRouter.post(
  "/flavors",
  validateSchemaMiddleware(flavorSchema),
  postFlavor
);
flavorRouter.get("/flavors", getFlavors);
export default flavorRouter;
