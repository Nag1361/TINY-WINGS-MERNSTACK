import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrderById);

// Admin routes
router.get('/admin/all', protect, authorize('admin'), getAllOrders);
router.put('/:id', protect, authorize('admin'), updateOrderStatus);

export default router;
