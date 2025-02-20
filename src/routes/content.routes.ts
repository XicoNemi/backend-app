import { Router } from "express";
import { ContentController } from "../controllers/content.controller";
import { verifyToken } from "../utils/verifyToken";

const router = Router();
const contentController = new ContentController();

router.get("/contents", verifyToken, contentController.getAllContents);
router.get("/contents/:id", verifyToken, contentController.getContent);
router.post("/contents", verifyToken, contentController.createContent);
router.put("/contents/:id", verifyToken, contentController.updateContent);
router.delete("/contents/:id", verifyToken, contentController.deleteContent);

export default router;