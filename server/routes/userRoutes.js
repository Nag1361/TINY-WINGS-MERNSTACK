import express from 'express';
import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.get('/', protect, authorize('admin'), getAllUsers);
router.get('/:id', protect, getUserById);
router.delete('/:id', protect, authorize('admin'), deleteUser);
router.put('/:id/role', protect, authorize('admin'), updateUserRole);

export default router;
