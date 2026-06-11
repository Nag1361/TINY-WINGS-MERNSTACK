import Child from '../models/Child.js';
import GrowthRecord from '../models/GrowthRecord.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

// @desc    Create child profile
// @route   POST /api/children
// @access  Private
export const createChild = asyncHandler(async (req, res) => {
  const { childName, gender, dateOfBirth, bloodGroup, skinTone } = req.body;

  if (!childName || !gender || !dateOfBirth) {
    return res.status(400).json({
      success: false,
      message: 'Please provide required fields',
    });
  }

  let child = new Child({
    childName,
    gender,
    dateOfBirth,
    bloodGroup,
    skinTone,
    parentId: req.user.id,
  });

  if (req.file) {
    child.photo.url = req.file.path;
    child.photo.publicId = req.file.filename;
  }

  await child.save();

  res.status(201).json({
    success: true,
    message: 'Child profile created successfully',
    child,
  });
});

// @desc    Get all children for a parent
// @route   GET /api/children
// @access  Private
export const getChildren = asyncHandler(async (req, res) => {
  const children = await Child.find({ parentId: req.user.id }).populate('growthRecords');

  res.status(200).json({
    success: true,
    count: children.length,
    children,
  });
});

// @desc    Get child by ID
// @route   GET /api/children/:id
// @access  Private
export const getChildById = asyncHandler(async (req, res) => {
  const child = await Child.findById(req.params.id).populate('growthRecords');

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
      message: 'Not authorized to access this child profile',
    });
  }

  res.status(200).json({
    success: true,
    child,
  });
});

// @desc    Update child profile
// @route   PUT /api/children/:id
// @access  Private
export const updateChild = asyncHandler(async (req, res) => {
  const { childName, gender, dateOfBirth, bloodGroup, skinTone, height, weight } = req.body;

  let child = await Child.findById(req.params.id);

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
      message: 'Not authorized to update this child profile',
    });
  }

  if (childName) child.childName = childName;
  if (gender) child.gender = gender;
  if (dateOfBirth) child.dateOfBirth = dateOfBirth;
  if (bloodGroup) child.bloodGroup = bloodGroup;
  if (skinTone) child.skinTone = skinTone;
  if (height) child.height = height;
  if (weight) child.weight = weight;

  if (req.file) {
    child.photo.url = req.file.path;
    child.photo.publicId = req.file.filename;
  }

  await child.save();

  res.status(200).json({
    success: true,
    message: 'Child profile updated successfully',
    child,
  });
});

// @desc    Delete child profile
// @route   DELETE /api/children/:id
// @access  Private
export const deleteChild = asyncHandler(async (req, res) => {
  const child = await Child.findById(req.params.id);

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
      message: 'Not authorized to delete this child profile',
    });
  }

  // Delete all growth records
  await GrowthRecord.deleteMany({ childId: req.params.id });

  await Child.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Child profile deleted successfully',
  });
});
