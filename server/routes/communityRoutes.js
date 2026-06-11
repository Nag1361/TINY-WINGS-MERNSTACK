import express from 'express';
import {
  createPost,
  getAllPosts,
  likePost,
  addComment,
  deletePost,
} from '../controllers/communityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/posts', getAllPosts);

// Protected routes
router.post('/posts', protect, upload.single('image'), createPost);
router.post('/posts/:id/like', protect, likePost);
router.post('/posts/:id/comment', protect, addComment);
router.delete('/posts/:id', protect, deletePost);

export default router;
