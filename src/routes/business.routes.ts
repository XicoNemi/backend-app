import { createBusiness, deleteBusiness, getAllBusinesses, getBusiness, updateBusiness } from "../controllers/business.controller";
import { Router } from "express";
import { verifyToken } from "../utils/verifyToken";

const router = Router();

router.get("/", verifyToken, getAllBusinesses);
router.get("/:id", verifyToken, getBusiness);
router.post("/", verifyToken, createBusiness);
router.put("/:id", verifyToken, updateBusiness);
router.delete("/:id", verifyToken, deleteBusiness);

export default router;