import { Router } from 'express';
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/articles.controllers.js';
import verifyToken from '../middleware/verifyToken.js';
import requireRole from '../middleware/requireRole.js';

const router = Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', verifyToken, requireRole('admin'), createArticle);
router.put('/:id', verifyToken, requireRole('admin'), updateArticle);
router.delete('/:id', verifyToken, requireRole('admin'), deleteArticle);

export default router;
