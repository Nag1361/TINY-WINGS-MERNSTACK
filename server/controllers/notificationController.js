import Contact from '../models/Contact.js';
import Notification from '../models/Notification.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  let contact = new Contact({
    name,
    email,
    subject,
    message,
  });

  await contact.save();

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully',
    contact,
  });
});

// @desc    Get all contacts (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
export const getAllContacts = asyncHandler(async (req, res) => {
  const { status } = req.query;

  let query = {};
  if (status) {
    query.status = status;
  }

  const contacts = await Contact.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: contacts.length,
    contacts,
  });
});

// @desc    Update contact status (Admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  let contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Contact status updated successfully',
    contact,
  });
});

// @desc    Create notification (Admin only)
// @route   POST /api/notifications
// @access  Private/Admin
export const createNotification = asyncHandler(async (req, res) => {
  const { title, message, type, userId, sendToAll } = req.body;

  if (!title || !message || !type) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  let notification = new Notification({
    title,
    message,
    type,
    userId: userId || null,
    sendToAll: sendToAll || false,
  });

  await notification.save();

  res.status(201).json({
    success: true,
    message: 'Notification created successfully',
    notification,
  });
});

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
export const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    $or: [{ userId: req.user.id }, { sendToAll: true }],
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notifications.length,
    notifications,
  });
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id
// @access  Private
export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Notification marked as read',
    notification,
  });
});
