import { Router } from "express";
import { postClient, getClients } from "../controllers/clientController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import clientSchema from "../schemas/clientSchema.js";

const clientRouter = Router();
clientRouter.post(
  "/clients",
  validateSchemaMiddleware(clientSchema),
  postClient
);
clientRouter.get("/clients", getClients);
export default clientRouter;
