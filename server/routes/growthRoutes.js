import express from 'express';
import {
  addGrowthRecord,
  getGrowthRecords,
  updateGrowthRecord,
  deleteGrowthRecord,
} from '../controllers/growthController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/:childId', protect, addGrowthRecord);
router.get('/:childId', protect, getGrowthRecords);
router.put('/:recordId', protect, updateGrowthRecord);
router.delete('/:recordId', protect, deleteGrowthRecord);

export default router;
