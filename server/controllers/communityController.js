import CommunityPost from '../models/CommunityPost.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

// @desc    Create post
// @route   POST /api/community/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      success: false,
      message: 'Please provide post content',
    });
  }

  let post = new CommunityPost({
    userId: req.user.id,
    content,
  });

  if (req.file) {
    post.image.url = req.file.path;
    post.image.publicId = req.file.filename;
  }

  await post.save();
  await post.populate('userId', 'name profilePicture');

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    post,
  });
});

// @desc    Get all posts
// @route   GET /api/community/posts
// @access  Public
export const getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const posts = await CommunityPost.find()
    .populate('userId', 'name profilePicture')
    .populate('comments.userId', 'name profilePicture')
    .populate('likes', 'name')
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await CommunityPost.countDocuments();

  res.status(200).json({
    success: true,
    count: posts.length,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
    posts,
  });
});

// @desc    Like post
// @route   POST /api/community/posts/:id/like
// @access  Private
export const likePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found',
    });
  }

  // Check if already liked
  if (post.likes.includes(req.user.id)) {
    post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
  } else {
    post.likes.push(req.user.id);
  }

  await post.save();

  res.status(200).json({
    success: true,
    message: 'Like toggled successfully',
    post,
  });
});

// @desc    Add comment
// @route   POST /api/community/posts/:id/comment
// @access  Private
export const addComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({
      success: false,
      message: 'Please provide comment',
    });
  }

  let post = await CommunityPost.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found',
    });
  }

  post.comments.push({
    userId: req.user.id,
    comment,
  });

  await post.save();
  await post.populate('comments.userId', 'name profilePicture');

  res.status(201).json({
    success: true,
    message: 'Comment added successfully',
    post,
  });
});

// @desc    Delete post
// @route   DELETE /api/community/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found',
    });
  }

  // Check if user is the owner
  if (post.userId.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this post',
    });
  }

  await CommunityPost.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Post deleted successfully',
  });
});
