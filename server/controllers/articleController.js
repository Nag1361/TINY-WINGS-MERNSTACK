import Article from '../models/Article.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

// @desc    Create article (Admin only)
// @route   POST /api/articles
// @access  Private/Admin
export const createArticle = asyncHandler(async (req, res) => {
  const { title, description, content, category } = req.body;

  if (!title || !description || !content || !category) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  let article = new Article({
    title,
    description,
    content,
    category,
    author: req.user.id,
  });

  if (req.file) {
    article.image.url = req.file.path;
    article.image.publicId = req.file.filename;
  }

  await article.save();

  res.status(201).json({
    success: true,
    message: 'Article created successfully',
    article,
  });
});

// @desc    Get all published articles
// @route   GET /api/articles
// @access  Public
export const getArticles = asyncHandler(async (req, res) => {
  const { category } = req.query;
  let query = { isPublished: true };

  if (category) {
    query.category = category;
  }

  const articles = await Article.find(query).populate('author', 'name email').sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: articles.length,
    articles,
  });
});

// @desc    Get article by ID
// @route   GET /api/articles/:id
// @access  Public
export const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id).populate('author', 'name email');

  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'Article not found',
    });
  }

  // Increment views
  article.views += 1;
  await article.save();

  res.status(200).json({
    success: true,
    article,
  });
});

// @desc    Update article (Admin only)
// @route   PUT /api/articles/:id
// @access  Private/Admin
export const updateArticle = asyncHandler(async (req, res) => {
  const { title, description, content, category, isPublished } = req.body;

  let article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'Article not found',
    });
  }

  if (title) article.title = title;
  if (description) article.description = description;
  if (content) article.content = content;
  if (category) article.category = category;
  if (isPublished !== undefined) article.isPublished = isPublished;

  if (req.file) {
    article.image.url = req.file.path;
    article.image.publicId = req.file.filename;
  }

  await article.save();

  res.status(200).json({
    success: true,
    message: 'Article updated successfully',
    article,
  });
});

// @desc    Delete article (Admin only)
// @route   DELETE /api/articles/:id
// @access  Private/Admin
export const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'Article not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Article deleted successfully',
  });
});
