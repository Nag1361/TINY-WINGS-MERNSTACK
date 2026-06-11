import express from 'express';
import {
  createContact,
  getAllContacts,
  updateContactStatus,
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
} from '../controllers/notificationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Contact routes
router.post('/contact', createContact);
router.get('/contact', protect, authorize('admin'), getAllContacts);
router.put('/contact/:id', protect, authorize('admin'), updateContactStatus);

// Notification routes
router.post('/', protect, authorize('admin'), createNotification);
router.get('/', protect, getUserNotifications);
router.put('/:id', protect, markNotificationAsRead);

export default router;
