import { Router } from "express";
import cakeRouter from "./cakeRouter.js";
import clientRouter from "./clientRouter.js";

const router = Router();

router.get("/health", async (req, res) => {
  res.sendStatus(200);
});

router.use(cakeRouter);

router.use(clientRouter);

export default router;
