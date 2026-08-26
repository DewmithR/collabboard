import { Router } from "express";
import * as controller from "../controllers/boardController.js";

const router = Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.get("/:id", controller.getOne);

export default router;