import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Article', 'Product', 'Vaccination', 'General', 'Order'],
      default: 'General',
    },
    relatedId: mongoose.Schema.Types.ObjectId,
    isRead: {
      type: Boolean,
      default: false,
    },
    sendToAll: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
