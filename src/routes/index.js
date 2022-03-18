import { Router } from "express";
import cakeRouter from "./cakeRouter.js";

const router = Router();

router.get("/health", async (req, res) => {
  res.sendStatus(200);
});

router.use(cakeRouter);

export default router;
