import { Router } from "express";
import { verifyToken } from "../utils/verifyToken";
import { getAllEstabs, getEstabById, createEstab, updateEstab, deleteEstab } from "../controllers/establishment.controller";

const router = Router()

router.get('/', verifyToken, getAllEstabs)
router.get('/:id', verifyToken, getEstabById)
router.post('/', verifyToken, createEstab)
router.put('/:id', verifyToken, updateEstab)
router.delete('/delete/:id', verifyToken, deleteEstab)

export default router