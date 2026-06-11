import Product from '../models/Product.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

// @desc    Create product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (!name || !description || !price || !category || stock === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  let product = new Product({
    name,
    description,
    price,
    category,
    stock,
  });

  if (req.file) {
    product.image.url = req.file.path;
    product.image.publicId = req.file.filename;
  }

  await product.save();

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product,
  });
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 12 } = req.query;

  let query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(query);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
    products,
  });
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// @desc    Update product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, featured } = req.body;

  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (category) product.category = category;
  if (stock !== undefined) product.stock = stock;
  if (featured !== undefined) product.featured = featured;

  if (req.file) {
    product.image.url = req.file.path;
    product.image.publicId = req.file.filename;
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product,
  });
});

// @desc    Delete product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// @desc    Add review to product
// @route   POST /api/products/:id/review
// @access  Private
export const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({
      success: false,
      message: 'Please provide rating and comment',
    });
  }

  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  // Check if user already reviewed
  const alreadyReviewed = product.reviews.find(
    (review) => review.userId.toString() === req.user.id
  );

  if (alreadyReviewed) {
    return res.status(400).json({
      success: false,
      message: 'You have already reviewed this product',
    });
  }

  product.reviews.push({
    userId: req.user.id,
    rating,
    comment,
  });

  // Update average rating
  const avgRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
  product.rating = Math.round(avgRating * 10) / 10;

  await product.save();

  res.status(201).json({
    success: true,
    message: 'Review added successfully',
    product,
  });
});
