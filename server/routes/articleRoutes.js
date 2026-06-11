import express from 'express';
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/', getArticles);
router.get('/:id', getArticleById);

// Protected/Admin routes
router.post('/', protect, authorize('admin'), upload.single('image'), createArticle);
router.put('/:id', protect, authorize('admin'), upload.single('image'), updateArticle);
router.delete('/:id', protect, authorize('admin'), deleteArticle);

export default router;
