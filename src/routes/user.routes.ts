import { Router } from 'express';
import {
  activeAccount,
  deleteUser,
  getAllUsers,
  getUser,
  newTypeUser,
  updateUser,
} from '../controllers/user.controller';

import { verifyToken } from '../utils/verifyToken';

const router = Router();

router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/type', verifyToken, newTypeUser);

router.get('/verify-email/:token', activeAccount);

export default router;
