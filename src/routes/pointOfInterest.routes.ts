import { Router } from "express";
import { getAllPoints, createPoint, deletePoint, getPointById, updatePoint } from "../controllers/pointOfInterest.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router()

router.get('/', verifyToken, getAllPoints)
router.get('/:id', verifyToken, getPointById)
router.post('/', verifyToken, createPoint)
router.put('/:id', verifyToken, updatePoint)
router.delete('/delete/:id', verifyToken, deletePoint)



export default router