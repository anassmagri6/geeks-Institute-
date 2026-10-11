import { Router } from 'express';
import { getCurrentUser, login, logout, register } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.get('/me', verifyToken, getCurrentUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
