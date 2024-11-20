import { Router } from "express";
import { verifyToken } from "../utils/verifyToken";
import { getAllEstabs, getEstabById, createEstab, updateEstab, deleteEstab } from "../controllers/establishment.controller";

const router = Router()

router.get('/', getAllEstabs)
router.get('/:id',  getEstabById)
router.post('/:id', verifyToken, createEstab)
router.put('/:id', verifyToken, updateEstab)
router.delete('/delete/:id', verifyToken, deleteEstab)

export default router