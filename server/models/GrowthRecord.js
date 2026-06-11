import mongoose from 'mongoose';

const growthRecordSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child',
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    recordDate: {
      type: Date,
      default: Date.now,
    },
    notes: String,
  },
  { timestamps: true }
);

const GrowthRecord = mongoose.model('GrowthRecord', growthRecordSchema);
export default GrowthRecord;
