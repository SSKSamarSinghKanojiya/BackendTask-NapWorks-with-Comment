const express = require("express"); // Import Express to create routes
const { createPost, getPosts } = require("../controllers/postController"); // Import post-related controllers
const authenticateUser = require("../middleware/authMiddleware"); // Import authentication middleware to protect routes
const { postValidationRules, validateRequest } = require("../utils/validation"); // Import validation rules and request validation middleware

const router = express.Router(); // Create an Express router

// Route to create a new post
// - `authenticateUser`: Ensures the user is authenticated before creating a post
// - `postValidationRules()`: Validates the request body (userId, postName, description, etc.)
// - `validateRequest`: Checks for validation errors and returns a response if any are found
// - `createPost`: Controller function that handles the logic for creating a new post
router.post("/posts", authenticateUser, postValidationRules(), validateRequest, createPost);

// Route to fetch all posts
// - `getPosts`: Controller function to retrieve and return all posts from the database
router.get("/posts", getPosts);

module.exports = router; // Export the router to be used in other parts of the application
