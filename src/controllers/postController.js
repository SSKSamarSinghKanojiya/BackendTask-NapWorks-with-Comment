const { validationResult } = require("express-validator"); // Import validation result from express-validator
const Post = require("../models/Post"); // Import Post model
const logger = require("../config/logger"); // Import logger for logging

// ==========================
// 📌 Create a New Post
// ==========================
exports.createPost = async (req, res) => {
  try {
    // Validate request data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract post details from request body
    const { userId, postName, description, tags, imageUrl } = req.body;

    // Ensure that the user creating the post is the logged-in user
    if (userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Create a new post instance
    const newPost = new Post({ userId, postName, description, tags, imageUrl });

    // Save the post to the database
    await newPost.save();

    // Log the creation of a new post
    logger.info(`New post created by user ${userId}`);

    // Send success response with the newly created post
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    // Log error details
    logger.error(`Post creation error: ${error.message}`);

    // Return server error response
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// 📌 Fetch Posts with Filters
// ==========================
exports.getPosts = async (req, res) => {
  try {
    // Extract query parameters from request
    let { searchText, startDate, endDate, tags, page = 1, limit = 10 } = req.query;

    // Initialize filter object
    let filter = {};

    // Ensure page and limit are numbers and have valid values
    page = parseInt(page);
    limit = parseInt(limit);
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    // Search posts by postName or description (case-insensitive)
    if (searchText) {
      filter.$or = [
        { postName: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ];
    }

    // Filter posts by upload time within a date range
    if (startDate || endDate) {
      filter.uploadTime = {};
      if (startDate) filter.uploadTime.$gte = new Date(startDate);
      if (endDate) filter.uploadTime.$lte = new Date(endDate);
    }

    // Filter posts by tags (multiple tags can be provided as comma-separated values)
    if (tags) {
      const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);
      if (tagArray.length > 0) {
        filter.tags = { $in: tagArray };
      }
    }

    // Fetch posts from database based on filters, with pagination
    const posts = await Post.find(filter)
      .skip((page - 1) * limit) // Skip posts for pagination
      .limit(limit); // Limit the number of posts per page

    // Log the fetch action
    logger.info("Posts fetched with filters");

    // Send response with total number of posts fetched
    res.status(200).json({ total: posts.length, posts });
  } catch (error) {
    // Log error details
    logger.error(`Fetch posts error: ${error.message}`);

    // Return server error response
    res.status(500).json({ message: "Server error" });
  }
};
