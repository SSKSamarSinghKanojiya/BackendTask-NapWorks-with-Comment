const { body, validationResult } = require("express-validator"); // Import express-validator for input validation

// Validation rules for user signup
const signupValidationRules = () => [
  body("name").notEmpty().withMessage("Name is required"), // Ensure name is not empty
  body("email").isEmail().withMessage("Invalid email format"), // Validate email format
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"), // Enforce password length
];

// Validation rules for user login
const loginValidationRules = () => [
  body("email").isEmail().withMessage("Invalid email format"), // Validate email format
  body("password").notEmpty().withMessage("Password is required"), // Ensure password is not empty
];

// Validation rules for creating a post
const postValidationRules = () => [
  body("userId").notEmpty().withMessage("User ID is required"), // Ensure userId is provided
  body("postName").notEmpty().withMessage("Post name is required"), // Ensure post name is provided
  body("description").notEmpty().withMessage("Description is required"), // Ensure description is provided
  body("tags").optional().isArray().withMessage("Tags must be an array"), // Validate tags if provided
  body("imageUrl").optional().isString().withMessage("Image URL must be a string"), // Validate image URL format if provided
];

// Middleware to handle validation results
const validateRequest = (req, res, next) => {
  const errors = validationResult(req); // Get validation errors from request
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
  }
  next(); // Proceed to the next middleware/controller if validation passes
};

module.exports = {
  signupValidationRules,
  loginValidationRules,
  postValidationRules,
  validateRequest,
};
