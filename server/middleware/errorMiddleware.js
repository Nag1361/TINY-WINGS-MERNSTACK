export const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  // Wrong MongoDB ID error
  if (err.name === 'CastError') {
    error.message = `Resource not found. Invalid: ${err.value}`;
    error.statusCode = 404;
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error.message = `${field} already exists`;
    error.statusCode = 400;
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = 401;
  }

  // JWT Expired error
  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.statusCode = 401;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
  });
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
