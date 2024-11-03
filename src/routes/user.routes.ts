import { Router } from "express";
import { activeAccount, createUser, deleteUser, getAllUsers, getUser, newTypeUser, updateUser } from "../controllers/user.controller";


const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put('/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get("/verify-email/:token", activeAccount);
router.post("/type", newTypeUser);

export default router;
