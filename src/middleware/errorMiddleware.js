const { logger } = require("../config/logger"); // Import the logger for error logging

// Middleware function to handle errors
const errorHandler = (err, req, res, next) => {
  logger.error(err.message); // Log the error message using the logger

  const statusCode = err.statusCode || 500; // Use the error's status code if available, otherwise default to 500 (Internal Server Error)

  res.status(statusCode).json({
    success: false, // Indicate the request was unsuccessful
    message: err.message || "Server Error", // Send the error message or a generic message
  });
};

module.exports = errorHandler; // Export the error-handling middleware
