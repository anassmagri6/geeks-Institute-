import express from 'express';
import {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
} from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;