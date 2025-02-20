import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/image.controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.put("/upload", upload.single("image"), uploadImage);

export default router;
