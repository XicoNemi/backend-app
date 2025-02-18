import { Router } from "express";
import {
    getAllUserHasRoutes,
    getUserHasRoutesById,
    createUserHasRoutes,
    updateUserHasRoutes,
    deleteUserHasRoutes
} from "../controllers/userHasRoute.controller";
import { verifyToken } from "../utils/verifyToken";

const router = Router();

router.get("/", verifyToken, getAllUserHasRoutes);
router.get("/:id", verifyToken, getUserHasRoutesById);
router.post("/", verifyToken, createUserHasRoutes);
router.put("/:id", verifyToken, updateUserHasRoutes);
router.delete("/:id", verifyToken, deleteUserHasRoutes);

export default router;
