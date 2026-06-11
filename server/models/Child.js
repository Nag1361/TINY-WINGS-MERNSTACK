import mongoose from 'mongoose';

const childSchema = new mongoose.Schema(
  {
    childName: {
      type: String,
      required: [true, 'Please provide child name'],
      trim: true,
      maxlength: 100,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [true, 'Please provide gender'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please provide date of birth'],
    },
    height: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    bloodGroup: {
      type: String,
      enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    },
    skinTone: {
      type: String,
      trim: true,
    },
    photo: {
      url: String,
      publicId: String,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    growthRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GrowthRecord',
      },
    ],
  },
  { timestamps: true }
);

const Child = mongoose.model('Child', childSchema);
export default Child;
