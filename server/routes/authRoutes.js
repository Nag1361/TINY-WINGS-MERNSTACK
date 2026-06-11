import express from 'express';
import { register, login, getCurrentUser, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.put('/updateprofile', protect, upload.single('profilePicture'), updateProfile);

export default router;
