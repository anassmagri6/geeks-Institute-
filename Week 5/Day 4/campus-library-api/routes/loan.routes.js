import express from 'express';
import { borrowBook, returnBook } from '../controllers/loan.controller.js';
const router = express.Router();


router.patch('/:id/return', returnBook);
router.post('/borrow', borrowBook);

export default router;