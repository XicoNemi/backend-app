import { Router } from "express";
import multer from "multer";
import { getBusinessImages, uploadImage } from "../controllers/image.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.put("/:tableName/:id", verifyToken, upload.single("image"), uploadImage);
router.get("/business", getBusinessImages);

export default router;
