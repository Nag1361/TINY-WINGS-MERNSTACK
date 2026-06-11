import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProductReview,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected/Admin routes
router.post('/', protect, authorize('admin'), upload.single('image'), createProduct);
router.put('/:id', protect, authorize('admin'), upload.single('image'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

// User routes
router.post('/:id/review', protect, addProductReview);

export default router;
