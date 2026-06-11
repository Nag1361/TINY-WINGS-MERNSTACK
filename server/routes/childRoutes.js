import express from 'express';
import {
  createChild,
  getChildren,
  getChildById,
  updateChild,
  deleteChild,
} from '../controllers/childController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Protected routes
router.post('/', protect, upload.single('photo'), createChild);
router.get('/', protect, getChildren);
router.get('/:id', protect, getChildById);
router.put('/:id', protect, upload.single('photo'), updateChild);
router.delete('/:id', protect, deleteChild);

export default router;
