import { Router } from "express";
import cakeRouter from "./cakeRouter.js";
import clientRouter from "./clientRouter.js";
import orderRouter from "./orderRouter.js";
import flavorRouter from "./flavorRouter.js";

const router = Router();

router.get("/health", async (req, res) => {
  res.sendStatus(200);
});

router.use(cakeRouter);

router.use(clientRouter);

router.use(orderRouter);

router.use(flavorRouter);

export default router;
