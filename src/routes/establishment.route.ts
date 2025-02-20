import { Router } from "express";
import { getAllEstabs, getEstabById, createEstab, updateEstab, deleteEstab } from "../controllers/establishment.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router()

router.get('/', verifyToken, getAllEstabs)
router.get('/:id', verifyToken, getEstabById)
router.post('/', verifyToken, createEstab)
router.put('/:id', verifyToken, updateEstab)
router.delete('/delete/:id', verifyToken, deleteEstab)

export default router