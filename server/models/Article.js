import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide article title'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, 'Please provide article description'],
    },
    content: {
      type: String,
      required: [true, 'Please provide article content'],
    },
    category: {
      type: String,
      enum: ['Healthcare', 'Parenting', 'Nutrition', 'Development', 'Safety'],
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      url: String,
      publicId: String,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);
export default Article;
