import { Router } from "express";
import {    
    createPromotion,
    deletePromotion,
    getAllPromotions,
    getPromotionById,
    updatePromotion
} from "../controllers/promotion.controller";
import { verifyToken } from "../middleware/verifyToken";


const router = Router();

router.get('/', verifyToken, getAllPromotions)
router.get('/:id', verifyToken, getPromotionById)
router.post('/', verifyToken, createPromotion)
router.put('/:id', verifyToken, updatePromotion)
router.delete('/delete/:id', verifyToken, deletePromotion)

export default router