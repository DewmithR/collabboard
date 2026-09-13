import { Router } from "express";
import * as controller from "../controllers/boardController.js";
import { validate } from "../middleware/validate.js";
import { createBoardSchema, addBoardMemberSchema } from "../schemas/boardSchema.js";

const router = Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.get("/:id", controller.getOne);
router.get("/:id/members", controller.listMembers);
router.post("/:id/members", validate(addBoardMemberSchema), controller.addMember);
router.delete("/:id/members/:memberId", controller.removeMember);
router.patch("/:id", validate(createBoardSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;