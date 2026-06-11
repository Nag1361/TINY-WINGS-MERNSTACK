import GrowthRecord from '../models/GrowthRecord.js';
import Child from '../models/Child.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

// @desc    Add growth record
// @route   POST /api/growth/:childId
// @access  Private
export const addGrowthRecord = asyncHandler(async (req, res) => {
  const { height, weight, notes } = req.body;
  const { childId } = req.params;

  if (!height || !weight) {
    return res.status(400).json({
      success: false,
      message: 'Please provide height and weight',
    });
  }

  const child = await Child.findById(childId);

  if (!child) {
    return res.status(404).json({
      success: false,
      message: 'Child not found',
    });
  }

  // Check if user is the parent
  if (child.parentId.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to add records for this child',
    });
  }

  let record = new GrowthRecord({
    childId,
    height,
    weight,
    notes,
  });

  await record.save();

  child.growthRecords.push(record._id);
  child.height = height;
  child.weight = weight;
  await child.save();

  res.status(201).json({
    success: true,
    message: 'Growth record added successfully',
    record,
  });
});

// @desc    Get growth records for a child
// @route   GET /api/growth/:childId
// @access  Private
export const getGrowthRecords = asyncHandler(async (req, res) => {
  const { childId } = req.params;

  const child = await Child.findById(childId);

  if (!child) {
    return res.status(404).json({
      success: false,
      message: 'Child not found',
    });
  }

  // Check if user is the parent
  if (child.parentId.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view records for this child',
    });
  }

  const records = await GrowthRecord.find({ childId }).sort({ recordDate: -1 });

  res.status(200).json({
    success: true,
    count: records.length,
    records,
  });
});

// @desc    Update growth record
// @route   PUT /api/growth/:recordId
// @access  Private
export const updateGrowthRecord = asyncHandler(async (req, res) => {
  const { height, weight, notes } = req.body;
  const { recordId } = req.params;

  let record = await GrowthRecord.findById(recordId);

  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Growth record not found',
    });
  }

  const child = await Child.findById(record.childId);

  // Check if user is the parent
  if (child.parentId.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this record',
    });
  }

  if (height) record.height = height;
  if (weight) record.weight = weight;
  if (notes) record.notes = notes;

  await record.save();

  res.status(200).json({
    success: true,
    message: 'Growth record updated successfully',
    record,
  });
});

// @desc    Delete growth record
// @route   DELETE /api/growth/:recordId
// @access  Private
export const deleteGrowthRecord = asyncHandler(async (req, res) => {
  const { recordId } = req.params;

  const record = await GrowthRecord.findById(recordId);

  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Growth record not found',
    });
  }

  const child = await Child.findById(record.childId);

  // Check if user is the parent
  if (child.parentId.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this record',
    });
  }

  // Remove record from child's growthRecords array
  child.growthRecords = child.growthRecords.filter(
    (id) => id.toString() !== recordId
  );
  await child.save();

  await GrowthRecord.findByIdAndDelete(recordId);

  res.status(200).json({
    success: true,
    message: 'Growth record deleted successfully',
  });
});
