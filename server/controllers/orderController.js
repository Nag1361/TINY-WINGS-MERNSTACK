import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

// @desc    Create order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { products, shippingAddress } = req.body;

  if (!products || products.length === 0 || !shippingAddress) {
    return res.status(400).json({
      success: false,
      message: 'Please provide products and shipping address',
    });
  }

  let totalAmount = 0;
  const orderProducts = [];

  for (let product of products) {
    const existingProduct = await Product.findById(product.productId);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: `Product ${product.productId} not found`,
      });
    }

    if (existingProduct.stock < product.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${existingProduct.name}`,
      });
    }

    totalAmount += existingProduct.price * product.quantity;
    orderProducts.push({
      productId: product.productId,
      quantity: product.quantity,
      price: existingProduct.price,
    });

    // Reduce stock
    existingProduct.stock -= product.quantity;
    await existingProduct.save();
  }

  let order = new Order({
    userId: req.user.id,
    products: orderProducts,
    totalAmount,
    shippingAddress,
  });

  await order.save();

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order,
  });
});

// @desc    Get all orders for a user
// @route   GET /api/orders
// @access  Private
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate('products.productId').sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('products.productId');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  // Check if user is the owner or admin
  if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this order',
    });
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;

  let order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order updated successfully',
    order,
  });
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('userId', 'name email')
    .populate('products.productId')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});
