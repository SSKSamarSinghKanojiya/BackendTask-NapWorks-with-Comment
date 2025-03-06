const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for authentication
const User = require("../models/User"); // Import User model
const logger = require("../config/logger"); // Import logger for logging
const { validationResult } = require("express-validator"); // Import validation result for request validation

// ==========================
// 📌 User Signup API
// ==========================
exports.signup = async (req, res) => {
  try {
    // Validate request data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed. Please check the provided data.",
        errors: errors.array(),
      });
    }

    // Extract name, email, and password from request body
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance and save it to the database
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT token for authentication
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Log user signup
    logger.info(`User signed up: ${email}`);

    // Send response with success message and token
    res.status(201).json({ success: true, message: "Signup successful", token });
  } catch (error) {
    // Log and return error response
    logger.error(`Signup error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ==========================
// 📌 User Login API
// ==========================
exports.login = async (req, res) => {
  try {
    // Validate request data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed. Please check the provided data.",
        errors: errors.array(),
      });
    }

    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token upon successful authentication
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Log user login
    logger.info(`User logged in: ${email}`);

    // Send response with success message and token
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    // Log and return error response
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ==========================
// 📌 Get User Profile (Protected Route)
// ==========================
exports.getProfile = async (req, res) => {
  try {
    // Find user by ID and exclude password field
    const user = await User.findById(req.user.id).select("-password");
    
    // If user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Send user details as response
    res.status(200).json({ success: true, user });
  } catch (error) {
    // Log and return error response
    logger.error(`Profile fetch error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/*
// Get User Profile (Protected Route)
exports.getProfile = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select("name email password createdAt updatedAt"); // Exclude password field
    const user = await User.findById(req.user.id).select("-password"); // Exclude password field
    // const user = await User.find() // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    logger.error(`Profile fetch error: ${error.message}`);
    res.status(500).json({ 
      message: "Server error",
      error:error.message
     });
  }
};

*/