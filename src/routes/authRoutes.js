const express = require("express"); // Import Express to create routes
const { signup, login, getProfile } = require("../controllers/authController"); // Import authentication-related controllers
const { signupValidationRules, loginValidationRules, validateRequest } = require("../utils/validation"); // Import validation rules and validation middleware
const authenticateJWT = require("../middleware/authMiddleware"); // Import authentication middleware to protect routes

const router = express.Router(); // Create an Express router

// Route for user signup
// - `signupValidationRules()`: Validates user input (name, email, password, etc.)
// - `validateRequest`: Checks for validation errors and returns a response if any are found
// - `signup`: Controller function to handle user registration
router.post("/signup", signupValidationRules(), validateRequest, signup);

// Route for user login
// - `loginValidationRules()`: Validates user input (email, password)
// - `validateRequest`: Checks for validation errors
// - `login`: Controller function to handle user authentication
router.post("/login", loginValidationRules(), validateRequest, login);

// Route to get user profile (Protected route)
// - `authenticateJWT`: Ensures that only authenticated users can access the profile
// - `getProfile`: Controller function to return user profile data
// router.get("/profile", authenticateJWT, getProfile); // Uncomment this to protect the route

router.get("/profile", getProfile); // Currently unprotected, make sure to secure it if needed

module.exports = router; // Export the router to be used in other parts of the application
